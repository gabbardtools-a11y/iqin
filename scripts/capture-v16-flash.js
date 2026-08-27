// Capture V16 at: idle (no flash), vertical-bar-crossing flash, horizontal-bar-crossing flash.
// We use Web Animations API to seek the animation to specific cycle positions.

const NODE_PATH = '/home/z/.npm-global/lib/node_modules/@mermaid-js/mermaid-cli/node_modules';
require('module').Module._initPaths();
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/logo-lab', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 1500));

  // Scroll V16 into view
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('h3'));
    const target = headers.find(h => h.innerText.includes('Cross Scan + Flash'));
    if (target) target.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 800));

  // Helper: pause all V16 animations and seek to a specific time, then screenshot
  async function seekAndScreenshot(animTimeMs, fileName) {
    await page.evaluate((t) => {
      // Find V16 card
      const headers = Array.from(document.querySelectorAll('h3'));
      const v16 = headers.find(h => h.innerText.includes('Cross Scan + Flash'));
      const card = v16.closest('.group') || v16.parentElement?.parentElement?.parentElement;
      const vline = card.querySelector('.logo-vscan-line');
      const hline = card.querySelector('.logo-hscan-line');
      const glyph = card.querySelector('.logo-glyph');
      // Pause all animations on these elements and seek to t
      const elemSet = [vline, hline, glyph];
      for (const el of elemSet) {
        if (!el) continue;
        const anims = el.getAnimations({ subtree: false });
        for (const a of anims) {
          a.pause();
          a.currentTime = t;
        }
      }
    }, animTimeMs);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: fileName });
    console.log(`✓ ${fileName} (anim t=${animTimeMs}ms)`);
  }

  // Capture at three moments:
  // - t=1000ms (1s): idle, before vertical flash (peak at ~3.5s)
  // - t=3500ms (3.5s): VERTICAL bar crossing glyph center — flash peak 1
  // - t=11500ms (11.5s): HORIZONTAL bar crossing glyph center — flash peak 2
  await seekAndScreenshot(1000, '/home/z/my-project/download/preview-logo-lab-v16-idle.png');
  await seekAndScreenshot(3500, '/home/z/my-project/download/preview-logo-lab-v16-vflash.png');
  await seekAndScreenshot(11500, '/home/z/my-project/download/preview-logo-lab-v16-hflash.png');

  // Also capture a full-card screenshot for context
  await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('h3'));
    const v16 = headers.find(h => h.innerText.includes('Cross Scan + Flash'));
    if (v16) v16.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: '/home/z/my-project/download/preview-logo-lab-v16-card.png' });
  console.log('✓ preview-logo-lab-v16-card.png (full card view)');

  await browser.close();
})();
