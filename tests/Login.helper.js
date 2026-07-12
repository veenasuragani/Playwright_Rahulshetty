const {expect} = require('@playwright/test');
async function Login(page, baseURL, email, password) {

    await page.goto(`${baseURL}/login`);
    await page.getByPlaceholder('you@email.com').fill(email);
    await page.getByRole('textbox', {name: 'password'}).fill(password);
    await page.getByRole('button', {name: 'Sign In'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole('link', { name: 'EventHub' })).toBeVisible();   

}
//resolved
module.exports = {Login};

