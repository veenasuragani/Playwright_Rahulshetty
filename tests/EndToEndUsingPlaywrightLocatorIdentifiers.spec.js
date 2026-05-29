const {test, expect} = require('@playwright/test');

test('end to end test', async ({page})=>{
    const email='suragani.veena@gmail.com'
    const products=await page.locator('.card-body');    
    const productName='ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder('email@example.com').fill(email);
    await page.getByPlaceholder('enter your passsword').fill('S.veena@1217');
    await page.getByRole('button', {name: 'login'}).click();
    await page.waitForLoadState('networkidle'); 
    await page.locator('.card-body b').first().waitFor();
    await page.locator('.card-body').filter({hasText: productName}).getByRole('button', {name:" Add To Cart"}).click();
    await expect(page.getByText('Product Added To Cart') ).toBeVisible();
    await page.getByRole("listitem").getByRole('button', {name: 'Cart'}).click(); 
    await page.locator('div li').first().waitFor();
    //await page.locator('div li').waitForLoadState();
    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole('button', { name: 'Checkout' }).click();
    await page.getByPlaceholder('Select Country').pressSequentially('ind', {delay:150});
    await page.getByRole('button', {name: 'India'}).nth(1).click();
    
    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.getByText('Name on Card ').locator('..').locator('input').fill('Veena Suragani');
    await page.getByText('CVV Code ').locator('..').locator('input').fill('123');
    await page.getByText('Apply Coupon ').locator('..').locator('input').fill('rahulshettyacademy'); 
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.getByText('* Coupon Applied')).toBeVisible();
    await page.getByText('Place Order ').click();
    await expect(page.getByText('Thankyou for the order. ')).toBeVisible();
    const orderId=await page.locator("label[class='ng-star-inserted']").textContent();
    console.log(orderId);
    await page.getByText(' Orders History Page ').click();
    await page.waitForLoadState('networkidle');

});
