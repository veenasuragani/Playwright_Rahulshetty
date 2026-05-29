const { test, expect } = require('@playwright/test');

test('child tabs', async ({browser}) => {
    const context= await browser.newContext();
    const page=await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    const [newPage] = Promise.all([
        context.waitForEvent('page'),
        page.locator('.blinkingText[href*="documents-request"]').click()
    ]);
    await newPage.waitForLoadState();
    const requiredText=await newPage.locator('.im-para.red').textContent();
    const domain=await requiredText.split('@')[1].split(' ')[0];
    console.log(domain);
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('.radiotextsty').last().click();
    await page.locator('#okayBtn').click();
    await page.locator('.form-control[data-style="btn-info"]').selectOption('consult');
    await page.locator('#terms').check();
    await expect(page.locator('#terms')).toBeChecked();
    expect (await page.locator('#terms').isChecked()).toBeTruthy();
    await page.locator('#signInBtn').click();
    await page.waitForLoadState('networkidle');
    const products = await page.locator('.card-body b').allTextContents();
    console.log(products);
});