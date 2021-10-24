const { chromium } = require('playwright');
const SitemapNode = require('./tree');
const fs = require('fs');
(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: false
  });
  const page = await browser.newPage();
  await page.addInitScript({ path: './preload.js' })
  await page.goto('https://bing.com/');
  
  var rootNode = new SitemapNode(await page.title(), await page.url(), "page", await page.screenshot())
  var currentNode = rootNode
  const test = async _ => {
    const pos = await page.evaluate(async () => {
      return stopAndReturnClickEvent()
    })
    let screenshot = await page.screenshot({clip: {x: pos.x - 200, y: pos.y - 200, width: 400, height: 400}})
    let title = await page.title() 
    let url = await page.url()
    currentNode.children.push(new SitemapNode(title, url, "action", screenshot))
    await page.evaluate(() => {
      continueEvent()
    })
    console.log("ja", JSON.stringify(pos))
  }
  page.on('load', test)
  page.on('load', async loadedpage => console.log(await loadedpage.title()));
  page.on('close', _ => {
    fs.writeFileSync('tree.json', JSON.stringify(rootNode, null, '\t'))
    process.exit()
  })
})();