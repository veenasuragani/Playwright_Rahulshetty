const {test, expect} = require('@playwright/test');

test('end to end test', async ({page})=>{
    const email='suragani.veena@gmail.com'
    const products=await page.locator('.card-body');
    const productName='ZARA COAT 3';
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('S.veena@1217');
    await page.locator('#login').click();
    await page.locator('.card-body b').first().waitFor();
    const count=await products.count();
    for(let i=0; i<=count; i++){
        const text_productname=await products.nth(i).locator('b').textContent();
        if(text_productname === productName){
            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
    } 
    await expect(page.locator('div[aria-label="Product Added To Cart"]')).toHaveText('Product Added To Cart');
    await page.locator("[routerlink*='cart']").click();
    await page.locator('div li').first().waitFor();
    //await page.locator('div li').waitForLoadState();
    expect (await page.locator('.cart').locator(`h3:has-text("${productName}")`).isVisible()).toBeTruthy();
    //await page.locator("li[class='totalRow'] button[type='button']").click();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially('ind', {delay:150});
    const dropdown =page.locator('.ta-results');
    await dropdown.waitFor();
    const countOfCountries=await dropdown.locator('button').count();
    for(let i=0; i<=countOfCountries; i++){
        const text=await dropdown.locator('button').nth(i).textContent();
        if(text === ' India'){
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    await expect(page.locator(".user__name label")).toHaveText(email);
    await page.locator("text=Name on Card ").locator('..').locator('input').fill('Veena Suragani');
    await page.locator("text=CVV Code ").locator('..').locator('input').fill('123');
    await page.locator("text=Apply Coupon ").locator('..').locator('input').fill('rahulshettyacademy'); 
    await page.getByRole('button', { name: 'Apply Coupon' }).click();
    await expect(page.locator(".mt-1.ng-star-inserted")).toHaveText("* Coupon Applied");
    await page.locator("text=Place Order ").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId=await page.locator("label[class='ng-star-inserted']").textContent();
    console.log(orderId);
    await page.locator("label[routerlink='/dashboard/myorders']").click();
    await page.waitForLoadState('networkidle');
    const orders=await page.locator('tbody tr');
    const countOfOrders=await orders.count();   
    for(let i=0; i<=countOfOrders; ++i){
        const text=await orders.nth(i).locator('th').textContent();
        if(orderId.includes(text)){
            await orders.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails=await page.locator('.col-text').textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

});
