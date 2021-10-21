const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({
    channel: 'msedge',
    headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://google.com/');
  page.on('load', async loadedpage => console.log(await loadedpage.title()));
  page.on('close', _ => process.exit())
})();