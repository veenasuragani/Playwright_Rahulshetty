const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "suragani.veena@gmail.com", userPassword: "S.veena@1217"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const ApiUtils = require('../utils/apiUtils');
let token;
let apiUtils;
let orderId;

test.beforeAll(async () => {
    const apiContext = await request.newContext();
    apiUtils = new ApiUtils(apiContext);
    token = await apiUtils.getToken(loginPayload);
    console.log(token);
    orderId = await apiUtils.createOrder(orderPayload, token);
});
test('@api Place the order', async ({page}) => { 
    const orderId = await apiUtils.createOrder(orderPayload, token);
    const email='suragani.veena@gmail.com'
    const products=await page.locator('.card-body');    
    const productName='ZARA COAT 3';
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');
    await page.locator("button[routerlink*='myorders']").click();
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
