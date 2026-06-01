const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const POManager = require('../../pages/POManager');

// Before Hook - Executes before each scenario
Before(async function (scenario) {
    console.log(`\n🎬 Starting Scenario: ${scenario.pickle.name}`);
    this.browser = await chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
    console.log('✅ Browser launched and page created');
});

// After Hook - Executes after each scenario
After(async function (scenario) {
    console.log(`\n🏁 Scenario Status: ${scenario.result.status.toUpperCase()}`);
    
    if (scenario.result.status === Status.FAILED) {
        // Take screenshot on failure
        const screenshotPath = `./test-results/screenshots/${scenario.pickle.name.replace(/\s+/g, '_')}.png`;
        console.log(`📸 Taking screenshot: ${screenshotPath}`);
        await this.page.screenshot({ path: screenshotPath });
    }
    
    if (this.page) {
        await this.page.close();
    }
    if (this.context) {
        await this.context.close();
    }
    if (this.browser) {
        await this.browser.close();
    }
    console.log('✅ Browser closed\n');
});

// BeforeStep Hook - Executes before each step
BeforeStep(async function (step) {
    console.log(`  ➡️  Executing: ${step.pickleStep.text}`);
});

// AfterStep Hook - Executes after each step
AfterStep(async function (step) {
    const status = step.result.status === Status.PASSED ? '✅ PASSED' : '❌ FAILED';
    console.log(`  ${status}: ${step.pickleStep.text}`);
    
    if (step.result.status === Status.FAILED) {
        console.error(`  Error: ${step.result.message}`);
    }
});
