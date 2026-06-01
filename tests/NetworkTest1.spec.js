const { test, expect, request } = require('@playwright/test');

test('SecurityTest', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('suragani.veena@gmail.com');
    await page.locator('#userPassword').fill('S.veena@1217');
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
    await page.waitForLoadState('networkidle');
    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*',
        async (route) => {
            route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=64ceb0487244490f9597ef94' });
        }
    )
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForLoadState('networkidle');
    await page.locator('button:has-text("View")').first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

});

test('networkAbort&RequestAndResponseData', async ({ browser }) => {
    
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route('**/*.{jpg, jpeg, png, svg}', route => route.abort());
    await page.route('**/*.CSS', route => route.abort());
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    page.on('request', request => console.log(request.url()));
    page.on('response', response => console.log(response.url(), response.status()));

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());    // css
    await userName.type('rahulshettyacademy');
    await page.locator('[type="password"]').type('Learning@830$3mK2');
    await signIn.click();
    console.log(await page.locator('[style*="block"]').textContent());
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
});
