const {test, expect, request} = require('@playwright/test');
const loginPayload = {userEmail: "suragani.veena@gmail.com", userPassword: "S.veena@1217"};
const orderPayload = {orders: [{country: "India", productOrderedId: "6960eac0c941646b7a8b3e68"}]};
const ApiUtils = require('../utils/apiUtils');
const fakePayloadOrder = {data:[], message: "No Orders"};
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
test('Place the order', async ({page}) => { 
    const orderId = await apiUtils.createOrder(orderPayload, token);
    const email='suragani.veena@gmail.com'
    const products=await page.locator('.card-body');    
    const productName='ZARA COAT 3';
    await page.addInitScript(value =>{
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForLoadState('networkidle');

    await page.route('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*', 
        async (route) => {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakePayloadOrder);
            await route.fulfill({
                response,
                body,
            })
        //intercepting the response--> API response-->{playwright fake reponse}-->browser-->render the data to front end
    })
    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse('https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*');
    await page.pause();
});