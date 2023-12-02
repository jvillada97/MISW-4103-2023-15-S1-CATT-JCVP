//Import node modules and db 
let playwright = require('playwright');
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const parser = require('node-html-parser');

//Constants
var screenshots_directory = './screenshots';
const beforeInteraction = 'BEFORE';
const afterInteraction = 'AFTER';
var temp_directory = './temp'; //Stores the visitedDOMs
var graphFilenameRoot = 'graph';

//Get configuration parameters.
let config = require('./config.json');
let baseUrl = config.url;
let headlessFlag = config.headless;
let depthLevels = config.depthLevels;
let inputValuesFlag = config.inputValues;
let viewportHeight = config.viewportHeight;
let viewportWidth = config.viewportWidth;
let browsers = config.browsers; //Possible values: 'webkit', 'chromium', 'firefox'
console.log(viewportHeight);
console.log(viewportWidth);

//Execution global variables
let statesDiscovered = 0; //Number of pages visited
let nodos = [];
let enlaces = [];
const visitedPages = new Map(); //URLs of the visited pages (key:URL, value:reachable URLs)
let pageTree = {};
let errors = []; //Errors Found


//Reading configuration parameters related to possible forms
let ids = [];
let inputValues = [];
if (inputValuesFlag === true) {
  let values = config.values
  Object.keys(values).forEach((key) => {
    ids.push(key);
    inputValues.push(values[key]);
  });
}

//Main execution
(async () => {
  if (browsers.length === 0) {
    return;
  }
  let datetime = new Date().toISOString().replace(/:/g, ".");
  for (b of browsers) {
    if (!b in ['chromium', 'webkit', 'firefox']) {
      return;
    }
    console.log(b);
    let basePath = `./results/${datetime}/${b}`
    screenshots_directory = `${basePath}/screenshots`;
    temp_directory = `${basePath}/temp` + b;
    graphFilenameRoot = `${basePath}/graph`;
    //Launch the current browser context
    const browser = await playwright[b].launch({ headless: headlessFlag });
    const context = await browser.newContext({ viewport: { width: viewportWidth, height: viewportHeight } });
    const page = await context.newPage();
    console.log(await page.viewportSize());

    //Make sure errors and console events are catched
    await addListeners(page);

    if (!fs.existsSync(screenshots_directory)) {
      fs.mkdirSync(screenshots_directory, { recursive: true });
    }
    else {
      clean(screenshots_directory)
    }
    //Create the temp directory if it doesn't exist. Clean the directory if it does.
    if (!fs.existsSync(temp_directory)) {
      fs.mkdirSync(temp_directory);
    }
    else {
      clean(temp_directory)
    }

    //-------------------------------------------------------------------------------------------------------------------------------------------------
    //Web application ripping
    //Initial params: Playwright's Page object, URL of the current page, index of current page, parent's index
    await recursiveExploration(page, baseUrl, 0, -1);

    printTree(); //Log in the console
    createTree(); //Persist in JSON file
    createErrorGraph(); //Persist graph with errors
    statesDiscovered = 0;
    nodos = [];
    enlaces = [];
    visitedPages.clear()
    pageTree = {};
    errors = [];
    browser.close();

    fs.copyFileSync('./index.html', `${basePath}/report.html`);
  }

  console.log('------------------------------------------------------------------------------------')
  console.log("Execution finished. Check the report under the results folder")
  return;
})();

//Get all anchors <a>
async function scrapLinks(page) {
  const stories = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a'));
    const links = anchors.map(anchor => anchor.href);
    const webLinks = links.filter(link => link.toString().includes('http'));
    return uniqueLinks = [...new Set(webLinks)];
  });

  return stories;
}

/**
 * @param {*} page Represents the playwright's Page object to interact with
 * @param {*} link Represents the current page's URL
 * @param {*} depth Represents the current node in the tree
 * @param {*} parentState Represents the previous node in the tree
 */
async function recursiveExploration(page, link, depth, parentState) {

  console.log('Depth Level: ' + depth + ' in ' + link);
  if (depth > depthLevels) {
    console.log("Depth levels reached. Exploration stopped")
    return;
  }
  console.log("Exploring");
  await page.goto(link, { waitUntil: 'networkidle2' }).catch((err) => {
    console.log(err);
    return;
  });
  let html = await getDOM(page);
  let parsedHtml = parser.parse(html);
  let body = parsedHtml.querySelector('body');

  if (!!body) {
    let DOM = body.structure;
    let visited = await stateAlreadyVisited(DOM); //Compares DOM with all of the persisted state files in the temp directory
    let currentState;
    //Look for this node in the node tree
    if (visited === -1) { //Has not been visited
      //Persists the new state found
      if (typeof html === 'string') {
        await saveDOM(DOM);
      }
      statesDiscovered++; //Count
      currentState = statesDiscovered - 1; //index of the current state (Latest)
      let nodo = {
        "state": currentState,
        "url": link
      }
      nodos.push(nodo);
    }
    else {
      currentState = visited;
    }

    //Look for possible connections to this node
    if (parentState !== -1) {
      let enlace = {
        "source": parentState,
        "target": currentState,
        "interaction": "link-click"
      }
      enlaces.push(enlace);
    }

    //Explore the current page
    console.log('Visiting: ' + link);
    console.log('Children pages: ');


    if (link.includes(baseUrl)) { //Only explore pages of the specified domain
      let elementList = [];
      await new Promise(resolve => setTimeout(resolve, 8000));

      //Fill the element list with DOM elements that provide interactions
      await getTextInputs(page, elementList);
      await getButtons(page, elementList);
      await getDropdowns(page, elementList);
      //Interact with the elements
      await interactWithObjects(elementList, page, currentState, link);

      //Taking screenshot of the current URL
      let imagePath = screenshots_directory + '/' + currentState + '.png';
      await page.screenshot({ path: imagePath, fullPage: true });
      const links = await scrapLinks(page);
      visitedPages.set(link, {
        url: link,
        children: links,
      });

      //Continue with the ripping process
      for (const newLink of links) {
        await recursiveExploration(page, newLink, depth + 1, currentState);
      }
    }
    else { //External pages are not explored
      //Taking screenshot
      let imagePath = screenshots_directory + '/' + currentState + '.png';
      await page.screenshot({ path: imagePath, fullPage: true });
    }
  }
}

//Fix URL strings
function slugify(stringUrl) {
  return stringUrl.replace(/[\/:]/g, '-');
}

//Add listeners for crash events and console error messages
async function addListeners(page) {
  page.on('pageerror', (err) => {
    err_name = err.toString();
    let capture_path = screenshots_directory + err_name + '.png'
    page.screenshot({ path: capture_path });
  });

  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
    try {
      let messageJson = JSON.stringify(msg, null, 2);
      let fullErrorMessage = {
        'url': page.url(),
        'message': messageJson,
      }
      errors.push(fullErrorMessage);
    } catch (error) {
      //Probably not an error  
    }
  });

  page.on('dialog', dialog => {
    console.log(dialog.message());
    dialog.dismiss();
  });
}

//Function to clean the directories that are going to be used during executions.
function clean(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) throw err;
      });
    }
  });
}

function deleteFolderRecursive(route) {
  if (fs.existsSync(route)) {
    fs.readdirSync(route).forEach((file, index) => {
      const curPath = path.join(route, file);
      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(route);
  }
};

//function to get the DOM structure from the page in String format
async function getDOM(page) {
  const html = await page.content().catch(err => {
    return null;
  });
  return html;
}

async function saveDOM(dom) {
  let path = temp_directory + '/' + statesDiscovered + '.txt';
  let stream = fs.createWriteStream(path);
  stream.write(dom);
}
//function to verify if the current DOM has already been visited;
async function stateAlreadyVisited(html) {
  //console.log(html);
  let path;
  let data;
  for (let i = 0; i < statesDiscovered; i++) {
    path = temp_directory + '/' + i + '.txt'
    data = fs.readFileSync(path, "utf8");
    if (data === html) {
      return i;
    }
  }
  return -1;
}

//Function to print tree
function printTree() {
  console.log('Tree: ');
  console.log();

  for (var [key, value] of visitedPages) {
    console.log(key);
    console.log(' Children: ');
    for (let index = 0; index < value.children.length; index++) {
      console.log(value.children[index]);
    }

    console.log('\n');
  }
}

function createTree() {

  let graphTry = {
    nodes: [],
    links: [],
  }

  for (var [key, value] of visitedPages) {
    graphTry.nodes.push({ url: key });
    for (let index = 0; index < value.children.length; index++) {
      graphTry.links.push({ source: key, target: value.children[index] });
    }
  }

  let availableNodes = graphTry.nodes.map(d => d.url);
  console.log('Possible Nodes: ');
  console.log(availableNodes);

  let availableLinks = [];

  console.log();
  for (let index = 0; index < graphTry.links.length; index++) {
    if (availableNodes.includes(graphTry.links[index].source) && availableNodes.includes(graphTry.links[index].target)) {
      availableLinks.push(graphTry.links[index]);
    }
  }

  console.log('Possible Links: ');
  console.log(availableLinks);

  //Final graph
  graphTry.links = availableLinks;

  //Save as JSON fil for D3
  const json = JSON.stringify(graphTry);

  fs.writeFile(graphFilenameRoot + '.json', json, function (err) {
    if (err) throw err;
    console.log('Saved JSON file!');
  });
}

// Method to obtain the text inputs of the page and push them to the list in the params.
async function getTextInputs(page, elementList) {
  let textInputs = await page.$$('input');
  let input;
  for (let i = 0; i < textInputs.length; i++) {
    input = {
      'type': 'input',
      'element': textInputs[i],
      'url': page.url()
    }
    elementList.push(input);
  }
}
//Method to obtain the buttons of the page and push them to the list in the params.
async function getButtons(page, elementList) {
  let buttons = await page.$$('button');
  let button;
  for (let i = 0; i < buttons.length; i++) {
    let disabled = page.evaluate((btn) => {
      return typeof btn.getAttribute("disabled") === "string" || btn.getAttribute("aria-disabled") === "true";
    }, buttons[i]);

    button = {
      'type': 'button',
      'element': buttons[i],
      'url': page.url()
    }
    elementList.push(button);

  }
}
//Method to obtain the dropdowns of the page and push them to the list in the params.
async function getDropdowns(page, elementList) {
  let selects = await page.$$('select');
  let select;
  for (let i = 0; i < selects.length; i++) {
    select = {
      'type': 'select',
      'element': selects[i],
      'url': page.url()
    }
    elementList.push(select);
  }
}

/**
 * Method to interact with the different objects that where scrapped
 * @param {*} elementList List containing DOM elements
 * @param {*} page Playwright's page object
 * @param {*} currentState Index for the current state in the node tree
 * @param {*} link Current URL
 */
async function interactWithObjects(elementList, page, currentState, link) {
  let object;
  for (let i = 0; i < elementList.length; i++) {
    object = elementList[i];
    await interactWithObject(object, page, currentState, i, link);
    await new Promise(resolve => setTimeout(resolve, 5000));

  }
}

// Method to interact with a single object depending on it's type
async function interactWithObject(object, page, currentState, interactionNumber, link) {
  if (object.type === 'input') {
    let elementHandle = object.element;
    let location = await getCoordinates(elementHandle, page);
    if (location.x !== 0 && location.y !== 0 && location.width !== 0 && location.height !== 0) {
      await elementHandle.hover().catch(e => {
        console.log('Could not hover to element');
      });
      //Fill inputs with either random values or with the values indicated in the config file
      if (inputValuesFlag) {
        let id = await page.evaluate(el => {
          return el.id
        }, elementHandle);

        //Try to find the elements with the ids indicated in the config file
        let index = ids.indexOf(id);
        if (index !== -1) {
          await elementHandle.click();
          await page.keyboard.type(inputValues[index]);
        }
        else {
          await fillInput(elementHandle, page);
        }
      }
      //TODO: What happens to inputs that are not specified on the config file?
      else {
        await fillInput(elementHandle, page);
      }
      await page.evaluate(_ => { window.scrollTo(0, 0) });
    }
  }
  else if (object.type === 'button') {
    let elementHandle = object.element;
    let location = await getCoordinates(elementHandle, page);
    if (location.x !== 0 && location.y !== 0 && location.width !== 0 && location.height !== 0) {
      //await elementScreenshot(location, currentState, page, beforeInteraction);
      await elementScreenshotwHandle(elementHandle, currentState, beforeInteraction);

      await elementHandle.hover().catch(e => {
        console.log('Could not hover to element');
      });
      await elementHandle.click().catch(e => {
        console.log('unclickable element');
      });
      let html = await getDOM(page);
      if (!!html) {

        let parsedHtml = parser.parse(html);
        let body = parsedHtml.querySelector('body');
        let DOM = body.structure;
        let visited = await stateAlreadyVisited(DOM);
        if (visited === -1) {
          await saveDOM(DOM);
          statesDiscovered++;
          let thisState = statesDiscovered - 1;
          let nodo = {
            "state": thisState,
            "url": link
          }
          let enlace = {
            "source": currentState,
            "target": thisState,
            "interaction": "button-click"
          }
          enlaces.push(enlace);
          nodos.push(nodo);
          //Taking screenshot
          let imagePath = screenshots_directory + '/' + thisState + '.png';
          await page.screenshot({
            path: imagePath,
            fullPage: true
          });
        }
        else {
          fs.unlinkSync(screenshots_directory + '/' + 'state_' + currentState + '_interaction_' + (statesDiscovered) + beforeInteraction + '.png',
            err => { if (err) console.log(err) })
        }
        await page.evaluate(_ => {
          window.scrollTo(0, 0);
        }).catch(err => { });
      }
    }
  }
  else if (object.type === "select") {
    let elementHandle = object.element;
    let location = await getCoordinates(elementHandle, page);
    if (location.x !== 0 && location.y !== 0 && location.width !== 0 && location.height !== 0) {
      let options = await page.evaluate(el => {
        return el.options;
      }, elementHandle);
      console.log(options);
      let prevDOM = await getDOM(page);
      for (let i = 0; i < options.length; i++) {
        if (typeof options[i].getAttribute("disabled") !== "string") { //i.e IF the option is enabled
          await elementHandle.click();
          await options[i].click();
          let currentDOM = await getDOM(page);
          //string replacement to compare DOMS without selected
          var unchanged = prevDOM.replace(/selected/g, '') === currentDOM.replace(/selected/g, '');
          if (!unchanged) {
            let parsedHtml = parser.parse(currentDOM);
            let body = parsedHtml.querySelector('body');
            let DOM = body.structure;
            let visited = await stateAlreadyVisited(DOM);
            if (visited === -1) {
              await saveDOM(DOM);
              statesDiscovered++;
              let thisState = statesDiscovered - 1;
              let nodo = {
                "state": thisState,
                "url": link
              }
              let enlace = {
                "source": currentState,
                "target": thisState,
                "interaction": "dropdown-opt-click"
              }
              enlaces.push(enlace);
              nodos.push(nodo);
              //Taking screenshot
              let imagePath = screenshots_directory + '/' + thisState + '.png';
              await page.screenshot({
                path: imagePath,
                fullPage: true
              });
            }
            else {
              fs.unlinkSync(screenshots_directory + '/' + 'state_' + currentState + '_interaction_' + (statesDiscovered) + beforeInteraction + '.png',
                err => { if (err) console.log(err) })
            }
            await page.evaluate(_ => {
              window.scrollTo(0, 0);
            }).catch(err => { });
          }
        }
      }
    }
  }
}
//Method to get the coordinates of a single element.
async function getCoordinates(elementHandle, page) {
  const location = await page.evaluate((elementHandle) => {
    const { top, left, width, height } = elementHandle.getBoundingClientRect();
    return { top, left, width, height };
  }, elementHandle);
  return location;
}

//Method to take a screenshot of a single element.
async function elementScreenshot(location, currentState, page, moment) {
  await page.screenshot({
    path: screenshots_directory + '/' + 'state_' + currentState + '_interaction_' + (statesDiscovered) + moment + '.png',
    clip: {
      x: location.left,
      y: location.top,
      width: location.width * 2 + 1,
      height: location.height * 2 + 1
    }
  }).catch((err) => {
    console.log(err);
  });
}
async function elementScreenshotwHandle(element, currentState, moment) {
  await element.screenshot({
    path: screenshots_directory + '/' + 'state_' + currentState + '_interaction_' + (statesDiscovered) + moment + '.png'
  }).catch((err) => {
    console.log(err);
  });
}

function createErrorGraph() {

  const nodeErrors = [];

  for (let i = 0; i < nodos.length; i++) {
    nodeErrors.push({
      'state': nodos[i].state,
      'url': nodos[i].url,
      'errors': [],
    });
  }

  for (let i = 0; i < nodeErrors.length; i++) {
    for (let j = 0; j < errors.length; j++) {
      if (nodeErrors[i].url === errors[j].url && !nodeErrors[i].errors.includes(errors[j].message)) {
        nodeErrors[i].errors.push(errors[j].message);
      }
    }
  }

  let graph = {
    "nodes": nodos,
    "links": enlaces
  };

  let json = JSON.stringify(graph);
  fs.writeFile(graphFilenameRoot + '2.json', json, function (err) {
    if (err) throw err;
  });

  let graphWithErrors = {
    "nodes": nodeErrors,
    "links": enlaces
  }

  let newJson = JSON.stringify(graphWithErrors);
  fs.writeFile(graphFilenameRoot + '3.json', newJson, function (err) {
    if (err) throw err;
  });
}

async function fillInput(elementHandle, page) {

  let type = await page.evaluate(el => {
    return el.type;
  }, elementHandle);
  if (type === 'text') {
    elementHandle.click();
    page.keyboard.type(faker.random.words());
  }
  else if (type === 'search') {
    elementHandle.click();
    page.keyboard.type(faker.random.alphaNumeric());
  }
  else if (type === 'password') {
    elementHandle.click();
    page.keyboard.type(faker.internet.password());
  }
  else if (type === 'email') {
    elementHandle.click();
    page.keyboard.type(faker.internet.email());
  }
  else if (type === 'tel') {
    elementHandle.click();
    page.keyboard.type(faker.phone.phoneNumber());
  }
  else if (type === 'number') {
    elementHandle.click();
    page.keyboard.type(faker.random.number);
  }
  else if (type === 'submit' || type === 'radio' || type === 'checkbox') {
    elementHandle.click();
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

