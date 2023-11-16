const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const path = require('path');

const { viewportHeight, viewportWidth, browsers, options } = config;

async function executeTest() {
  if (browsers.length === 0) {
    return;
  }
  let resultInfo = {}
  let datetime = new Date().toISOString().replace(/:/g, ".");
  const firstFolder = path.join(__dirname, '../GHOST_5_68_0/Kraken/reports/');
  const secondFolder = path.join(__dirname, '../GHOST_4_44_0/Kraken/reports/');

  if (!fs.existsSync(`./results/${datetime}`)) {
    fs.mkdirSync(`./results/${datetime}`, { recursive: true });
  }
  const filesF = await fs.readdirSync(firstFolder);
  for (const folder of filesF) {


  if (!fs.existsSync(`./results/${datetime}/${folder}`)) {
    fs.mkdirSync(`./results/${datetime}/${folder}`, { recursive: true });
  }
    const files1 = await fs.readdirSync(firstFolder + "/" + folder);
    // Recorrer cada archivo en la primera carpeta
    for (const file of files1) {
      // Obtener el nombre del archivo

      // Obtener el contenido de los archivos de ambas carpetas
      const image1 = await fs.readFileSync(path.join(firstFolder + "/" + folder, file));
      const image2 = await fs.readFileSync(path.join(secondFolder + "/" + folder, file));

      // Comparar las imágenes
      const data = await compareImages(image1, image2, options);

      // ...


      resultInfo['Comparación'] = {
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference,
        rawMisMatchPercentage: data.rawMisMatchPercentage,
        misMatchPercentage: data.misMatchPercentage,
        diffBounds: data.diffBounds,
        analysisTime: data.analysisTime
      }
      fs.writeFileSync(`./results/${datetime}/${folder}/compare-${file}`, data.getBuffer());
    }
  }

  fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, resultInfo));
  fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")
  return resultInfo;
}
(async () => console.log(await executeTest()))();

function browser(b, info) {
  return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Browser: ${b}</h2>
        <p>Data: ${JSON.stringify(info)}</p>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="before-${b}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="after-${b}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare-${b}.png" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo) {
  return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for 
                 <a href="${config.url}"> ${config.url}</a>
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map(b => browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}
