const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');
const GhostIni = config.urlIni;
const GhostFin = config.urlFin;
const carpetas = config.carpetas;
let datetime = new Date().toISOString().replace(/:/g, ".");


const { viewportHeight, viewportWidth, browsers, options } = config;

async function executeTest() {
  let resultInfo = {}
  const respuesta = {};
  const firstFolder = path.join(__dirname, GhostIni);
  const secondFolder = path.join(__dirname, GhostFin);

  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }
  let bandera = 0;
  const filesF = await fs.readdirSync(firstFolder);

  for (const folder of filesF) {
    if (!carpetas.includes(folder)) {
      await fs.rmdirSync(path.join(firstFolder, folder), { force: true });
    }
  }

  for (const folder of filesF) {
    bandera = bandera + 1;
    if (!fs.existsSync(`./results/${datetime}/${folder}`)) {
      fs.mkdirSync(`./results/${datetime}/${folder}`, { recursive: true });
    }
    const files1 = await fs.readdirSync(firstFolder + "/" + folder);
    // Recorrer cada archivo en la primera carpeta
    for (const file of files1) {
      // Obtener el nombre del archivo
      const image1 = await fs.readFileSync(path.join(firstFolder + "/" + folder, file));
      const image2 = await fs.readFileSync(path.join(secondFolder + "/" + folder, file));

      const data = await compareImages(image1, image2, options);

      resultInfo[file] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      }
      fs.writeFileSync(`./results/${datetime}/${folder}/compare-${file}`, data.getBuffer());

    }
    respuesta[folder] = resultInfo;
    resultInfo = {}
  }
  return respuesta;
}
(async () => console.log(await executeTest()))();



function escenarios(escenario, respuesta) {
  return `
  <h2>${escenario}</h2>
  ${Object.keys(respuesta[escenario]).map((imagen) => {
    return `
    <div class="browser" id="test0">
      <div class=" btitle">
          <h3>Caso de prueba: ${imagen}</h3>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Referencia ${GhostIni}</span>
          <img class="img2" src="../../${GhostIni}/${escenario}/${imagen}" id="refImage" label="Reference">
        </div>
        <div class="imgcontainer">
          <span class="imgname">Test ${GhostFin}</span>
          <img class="img2" src="../../${GhostFin}/${escenario}/${imagen}" id="testImage" label="Test">
        </div>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Resultado comparación</span>
          <img class="imgfull" src="./${escenario}/compare-${imagen}" id="diffImage" label="Diff">
        </div>
      </div>
    </div>
    `;
  })}
  `;
}
function createReport(datetime, respuesta) {
  return `
  <html>
    <head>
      <title> VRT Report </title>
      <link href="index.css" type="text/css" rel="stylesheet">
    </head>
    <body>
      <h1>Reporte para 
        <a href="../../${GhostIni}"> ${GhostIni}</a>
        <a href="../../${GhostFin}"> ${GhostFin}</a>
      </h1>
      <p>Executado: ${datetime}</p>
      <div id="visualizer"> Escenario de Prueba: 
        ${Object.keys(respuesta).map((escenario) => {
    return escenarios(escenario, respuesta);
  })}
      </div>
    </body>
  </html>
  `;
}

async function main() {
  const respuesta = await executeTest();

  fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, respuesta));
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);
  console.log("-------------------------------------------------------------");
  console.log("Execution finished. Check the report under the results folder");
}
main();