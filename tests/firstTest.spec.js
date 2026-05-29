const { test, expect } = require('@playwright/test');

// In this test, we are using the browser fixture to create a new context and page. 
// We can pass different options to the newContext method to customize the 
// browser context, such as setting the viewport size, user agent, or geolocation. 
//Incase if we are creating new context with deafult options, we can simply use page 
// fixture which will automatically create context and page. 
test('browser test', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle("Google");
});

//if we want to run the test in a single browser, we can use the page fixture 
// directly without creating a new context and page. 
// This is a more concise way to write the test when we don't need to manage multiple contexts or pages.   
test('page test', async ({page})=>{
    await page.goto('https://www.google.com/');
    await expect(page).toHaveTitle("Google");
});

