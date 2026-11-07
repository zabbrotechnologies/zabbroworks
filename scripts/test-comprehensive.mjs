import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:5175';

const results = [];

function recordResult(suite, name, passed, detail = '') {
  results.push({ suite, name, passed, detail });
  const status = passed ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} [${suite}] ${name}${detail ? ' - ' + detail : ''}`);
}

async function runTestSuite() {
  console.log(`\n========================================`);
  console.log(`🚀 STARTING COMPLETE PLAYWRIGHT TEST SUITE`);
  console.log(`Target: ${BASE_URL}`);
  console.log(`========================================\n`);

  const browser = await chromium.launch({ headless: true });
  
  // Track console errors
  const consoleErrors = [];

  try {
    // ----------------------------------------------------
    // TEST SUITE 1: Core Landing Page & Hero Verification
    // ----------------------------------------------------
    console.log(`\n--- SUITE 1: Core Landing Page & Hero ---`);
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    const resp = await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 15000 });
    recordResult('Core', 'HTTP Status 200', resp && resp.status() === 200, `Status: ${resp?.status()}`);

    const title = await page.title();
    recordResult('Core', 'Page Title Exists', title.length > 0, `Title: "${title}"`);

    const heroHeading = await page.locator('.hero-monumental-heading').textContent();
    recordResult('Hero', 'Hero Monumental Heading', heroHeading.includes('TECHNOLOGY') && heroHeading.includes('REAL PROBLEMS'), heroHeading.trim().replace(/\s+/g, ' '));

    const heroCounter = await page.locator('.hero-counter-number').textContent();
    recordResult('Hero', 'Total Experience Live Counter', parseInt(heroCounter, 10) >= 26, `Count: ${heroCounter}`);

    const ambientCanvas = await page.locator('.fluid-ambient-canvas, canvas, .verhost-ambient-backdrop').count();
    recordResult('Background', 'Ambient Fluid Background Canvas', ambientCanvas > 0);

    // ----------------------------------------------------
    // TEST SUITE 2: Gallery Sections Verification (All 6)
    // ----------------------------------------------------
    console.log(`\n--- SUITE 2: Gallery Sections Verification ---`);
    const expectedSections = [
      { id: '#section-ecommerce', name: 'E-COMMERCE', count: 4 },
      { id: '#section-business', name: 'BUSINESS', count: 5 },
      { id: '#section-landing', name: 'LANDING', count: 4 },
      { id: '#section-portfolio', name: 'PORTFOLIO', count: 4 },
      { id: '#section-creative', name: 'CREATIVE', count: 5 },
      { id: '#section-interior', name: 'INTERIOR DESIGN', count: 5 }
    ];

    for (const sec of expectedSections) {
      const sectionEl = page.locator(sec.id);
      const exists = (await sectionEl.count()) > 0;
      recordResult('Sections', `Section exists: ${sec.name} (${sec.id})`, exists);

      if (exists) {
        const thumbs = sectionEl.locator('.thumbnail-nav-item');
        const thumbCount = await thumbs.count();
        recordResult('Sections', `${sec.name} item count matches expected (${sec.count})`, thumbCount === sec.count, `Found: ${thumbCount}`);

        const ctaBtn = sectionEl.locator('.view-projects-pill-btn');
        recordResult('Sections', `${sec.name} CTA button present`, (await ctaBtn.count()) > 0);

        const mockupFrame = sectionEl.locator('.perspective-device-frame');
        recordResult('Sections', `${sec.name} 3D perspective mockup frame present`, (await mockupFrame.count()) > 0);
      }
    }

    // ----------------------------------------------------
    // TEST SUITE 3: Interior Designing Section Deep Test
    // ----------------------------------------------------
    console.log(`\n--- SUITE 3: Interior Designing Section Deep Test ---`);
    const interiorSec = page.locator('#section-interior');
    await interiorSec.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const interiorHeading = await interiorSec.locator('.category-display-heading').textContent();
    recordResult('Interior', 'Section Heading is INTERIOR DESIGNING', interiorHeading.includes('INTERIOR') && interiorHeading.includes('DESIGNING'));

    const interiorThumbs = interiorSec.locator('.thumbnail-nav-item');
    const expectedInteriorProjects = ['INTRIO', 'DATUM INTERIOR', 'CHOROO', 'ELIRAS', 'PRIME AXIS'];

    for (let i = 0; i < expectedInteriorProjects.length; i++) {
      const thumb = interiorThumbs.nth(i);
      const text = await thumb.locator('.thumb-item-title').textContent();
      const matches = text.trim() === expectedInteriorProjects[i];
      recordResult('Interior', `Sidebar item ${i + 1} is ${expectedInteriorProjects[i]}`, matches, `Found: "${text.trim()}"`);

      // Verify miniature preview image
      const imgCount = await thumb.locator('img').count();
      recordResult('Interior', `${expectedInteriorProjects[i]} has preview thumbnail image`, imgCount > 0);
    }

    // Test thumbnail clicking and reactive update in Center Mockup
    console.log(`\n--- SUITE 4: Thumbnail Clicking & Reactive Updates ---`);
    // Click 2nd item: DATUM INTERIOR
    await interiorThumbs.nth(1).click();
    await page.waitForTimeout(400);
    let activeTitle = await interiorSec.locator('.meta-project-title').textContent();
    recordResult('Reactivity', 'Clicking DATUM INTERIOR updates preview title', activeTitle.includes('DATUM INTERIOR'), `Active: ${activeTitle}`);

    let activeThumb = await interiorSec.locator('.thumbnail-nav-item.is-active-thumb .thumb-item-title').textContent();
    recordResult('Reactivity', 'DATUM INTERIOR marked as active thumbnail', activeThumb.includes('DATUM INTERIOR'));

    // Click 4th item: ELIRAS
    await interiorThumbs.nth(3).click();
    await page.waitForTimeout(400);
    activeTitle = await interiorSec.locator('.meta-project-title').textContent();
    recordResult('Reactivity', 'Clicking ELIRAS updates preview title', activeTitle.includes('ELIRAS'), `Active: ${activeTitle}`);

    // Test Up/Down arrows
    const prevArrow = interiorSec.locator('.selector-arrow-btn').first();
    const nextArrow = interiorSec.locator('.selector-arrow-btn').last();

    await nextArrow.click(); // Should go from 4 (ELIRAS) to 5 (PRIME AXIS)
    await page.waitForTimeout(400);
    activeTitle = await interiorSec.locator('.meta-project-title').textContent();
    recordResult('Reactivity', 'Next arrow navigates to PRIME AXIS', activeTitle.includes('PRIME AXIS'), `Active: ${activeTitle}`);

    const counterText = await interiorSec.locator('.selector-counter-label').textContent();
    recordResult('Reactivity', 'Counter updates to 05 / 05', counterText.trim() === '05 / 05', `Counter: ${counterText.trim()}`);

    // ----------------------------------------------------
    // TEST SUITE 5: ProjectViewer Modal Interactivity
    // ----------------------------------------------------
    console.log(`\n--- SUITE 5: ProjectViewer Modal Interactivity ---`);
    // Open project viewer by clicking CTA button on Interior section
    const ctaBtn = interiorSec.locator('.view-projects-pill-btn');
    await ctaBtn.click();
    await page.waitForTimeout(800);

    const modal = page.locator('.verhost-project-viewer-modal');
    recordResult('Modal', 'Project Viewer Modal Opens', (await modal.count()) > 0);

    const modalTitle = await modal.locator('.viewer-project-title').textContent();
    recordResult('Modal', 'Modal displays active project title', modalTitle.includes('PRIME AXIS'), `Modal title: ${modalTitle}`);

    // Check device switcher buttons
    const desktopBtn = modal.locator('.device-btn-desktop');
    const tabletBtn = modal.locator('.device-btn-tablet');
    const mobileBtn = modal.locator('.device-btn-mobile');
    recordResult('Modal', 'Device switcher buttons exist (Desktop/Tablet/Mobile)', (await desktopBtn.count()) > 0 && (await tabletBtn.count()) > 0 && (await mobileBtn.count()) > 0);

    // Switch to tablet mode
    await tabletBtn.click();
    await page.waitForTimeout(300);
    let frameWidth = await modal.locator('.viewer-container-frame').evaluate(el => el.style.width);
    recordResult('Modal', 'Switching to Tablet sets width to 768px', frameWidth === '768px', `Width: ${frameWidth}`);

    // Switch to mobile mode
    await mobileBtn.click();
    await page.waitForTimeout(300);
    frameWidth = await modal.locator('.viewer-container-frame').evaluate(el => el.style.width);
    recordResult('Modal', 'Switching to Mobile sets width to 390px', frameWidth === '390px', `Width: ${frameWidth}`);

    // Switch back to desktop
    await desktopBtn.click();
    await page.waitForTimeout(300);
    frameWidth = await modal.locator('.viewer-container-frame').evaluate(el => el.style.width);
    recordResult('Modal', 'Switching to Desktop restores 100% width', frameWidth === '100%', `Width: ${frameWidth}`);

    // Test external site quick launch banner
    const externalBanner = modal.locator('.viewer-external-banner');
    recordResult('Modal', 'External project banner with "Open Full Site" button is visible', (await externalBanner.count()) > 0);

    // Test Keyboard navigation (Next: ArrowRight, Prev: ArrowLeft)
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(500);
    const navTitle = await modal.locator('.viewer-project-title').textContent();
    recordResult('Modal', 'ArrowLeft navigates to previous project', navTitle.includes('ELIRAS'), `Nav title: ${navTitle}`);

    // Test Escape to close
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    const modalClosed = (await page.locator('.verhost-project-viewer-modal').count()) === 0;
    recordResult('Modal', 'Pressing Escape closes the modal cleanly', modalClosed);

    // ----------------------------------------------------
    // TEST SUITE 6: Hero Navigation & Footer Links
    // ----------------------------------------------------
    console.log(`\n--- SUITE 6: Hero Navigation & Footer Links ---`);
    await page.evaluate(() => window.scrollTo({ top: 0 }));
    await page.waitForTimeout(400);

    // Click 'INTERIOR DESIGN' category pill in Hero
    const interiorHeroBtn = page.locator('.hero-category-item', { hasText: 'INTERIOR DESIGN' });
    const heroBtnFound = (await interiorHeroBtn.count()) > 0;
    recordResult('Navigation', 'Hero has "INTERIOR DESIGN" category button', heroBtnFound);

    if (heroBtnFound) {
      await interiorHeroBtn.click();
      await page.waitForTimeout(800);
      const isVisible = await interiorSec.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top >= -200 && rect.bottom <= window.innerHeight + 300;
      });
      recordResult('Navigation', 'Clicking Hero pill scrolls to Interior section', isVisible);
    }

    // Check Footer link
    const footerLink = page.locator('.footer-nav-column a[href="#section-interior"]');
    recordResult('Footer', 'Footer contains "06 —— INTERIOR DESIGN" anchor link', (await footerLink.count()) > 0);

    // Test Footer Back to Top
    const backToTopBtn = page.locator('.footer-back-to-top');
    await backToTopBtn.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await backToTopBtn.click();
    await page.waitForFunction(() => window.scrollY < 200, { timeout: 5000 });
    const scrollY = await page.evaluate(() => window.scrollY);
    recordResult('Footer', 'Back to top button smoothly scrolls to top', scrollY < 200, `scrollY: ${Math.round(scrollY)}`);

    // ----------------------------------------------------
    // TEST SUITE 7: Direct Standalone Store Views
    // ----------------------------------------------------
    console.log(`\n--- SUITE 7: Standalone Store Views (?view=...) ---`);
    const viewsToTest = [
      { id: 'lumora-living', checkSelector: '.lumora-store-root, .standalone-project-container' },
      { id: 'chronix', checkSelector: '.chronix-store-root, .standalone-project-container' },
      { id: 'glowe', checkSelector: '.glowe-store-root, .standalone-project-container' },
      { id: 'atelier', checkSelector: '.atelier-studio-root, .standalone-project-container' },
      { id: 'verdant-systems', checkSelector: '.verdant-root, .standalone-project-container' }
    ];

    for (const v of viewsToTest) {
      await page.goto(`${BASE_URL}/?view=${v.id}`, { waitUntil: 'networkidle', timeout: 10000 });
      const el = page.locator(v.checkSelector);
      const ok = (await el.count()) > 0;
      recordResult('Standalone', `Direct view ?view=${v.id} loads properly`, ok);
    }

    // ----------------------------------------------------
    // TEST SUITE 8: Responsive Layout Validation
    // ----------------------------------------------------
    console.log(`\n--- SUITE 8: Responsive Viewport Validation ---`);
    const viewports = [
      { name: 'Desktop (1440x900)', width: 1440, height: 900 },
      { name: 'Tablet (768x1024)', width: 768, height: 1024 },
      { name: 'Mobile (390x844)', width: 390, height: 844 }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(BASE_URL, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const overflow = bodyWidth > vp.width + 10;
      recordResult('Responsive', `${vp.name} no horizontal window overflow`, !overflow, `Body scrollWidth: ${bodyWidth}px (Viewport: ${vp.width}px)`);

      const sectionsCount = await page.locator('.category-showcase-row').count();
      recordResult('Responsive', `${vp.name} all 6 sections visible`, sectionsCount === 6, `Found: ${sectionsCount}`);
    }

    await context.close();
  } catch (err) {
    console.error('Fatal Test Execution Error:', err);
    recordResult('Execution', 'Test suite completed without fatal error', false, err.message);
  } finally {
    await browser.close();
  }

  // ----------------------------------------------------
  // Summary Report
  // ----------------------------------------------------
  console.log(`\n========================================`);
  console.log(`📊 TEST SUITE SUMMARY RESULTS`);
  console.log(`========================================`);

  const passedCount = results.filter(r => r.passed).length;
  const failedCount = results.filter(r => !r.passed).length;
  const totalCount = results.length;

  console.log(`Total Assertions: ${totalCount}`);
  console.log(`Passed:          ${passedCount} ✅`);
  console.log(`Failed:          ${failedCount} ${failedCount > 0 ? '❌' : ''}`);
  console.log(`Success Rate:    ${Math.round((passedCount / totalCount) * 100)}%`);

  if (consoleErrors.length > 0) {
    console.log(`\n⚠️ Browser Console Errors Detected (${consoleErrors.length}):`);
    consoleErrors.forEach((e, i) => console.log(`  [${i + 1}] ${e}`));
  } else {
    console.log(`\n✨ Zero Browser Console Errors Detected!`);
  }
  console.log(`========================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runTestSuite();

