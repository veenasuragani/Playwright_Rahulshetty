const {test, expect} = require('@playwright/test');
test('wait for all text content to be visible', async ({page})=>{
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
await page.locator('#userEmail').fill('suragani.veena@gmail.com');
await page.locator('#userPassword').fill('S.veena@1217');
await page.locator('#login').click();
await page.waitForLoadState('networkidle'); //1 way
await page.locator('.card-body b').first().waitFor(); //2 way
const products=await page.locator('.card-body b').allTextContents();
console.log(products);
});