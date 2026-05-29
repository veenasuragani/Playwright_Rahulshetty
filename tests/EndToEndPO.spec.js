const {test, expect} = require('@playwright/test');
const {customtest} = require('../utils/testbase');
const POManager = require('../pages/POManager');
const Testdata = JSON.parse(JSON.stringify(require('../utils/productTestData.json')));

// test.describe.configure({ mode: 'serial' });
for(const data of Testdata){
test(`@web end to end test with ${data.productName}`, async ({page})=>{
    const email=data.username;
    const password=data.password;
    const products=await page.locator('.card-body');    
    const productName=data.productName;

    const poManager=new POManager(page);
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);    
    await page.waitForLoadState('networkidle'); 

    const dashboardPage=poManager.getDashboardPage();
    await dashboardPage.searchAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage=poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.proceedToCheckout();  
    
    const checkoutPage=poManager.getCheckoutPage();
    await checkoutPage.checkoutandplaceorder(email, data.country, data.nameOnCard, data.cvv, data.couponCode);

});
}

customtest('@web end to end test with ZARA COAT 3 using fixture', async ({page, testDataForOrder})=>{
    const email=testDataForOrder.username;
    const password=testDataForOrder.password;
    const products=await page.locator('.card-body');    
    const productName=testDataForOrder.productName;

    const poManager=new POManager(page);
    const loginPage=poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);    
    await page.waitForLoadState('networkidle'); 

    const dashboardPage=poManager.getDashboardPage();
    await dashboardPage.searchAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage=poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.proceedToCheckout();  
    
    const checkoutPage=poManager.getCheckoutPage();
    await checkoutPage.checkoutandplaceorder(email, testDataForOrder.country, testDataForOrder.nameOnCard, testDataForOrder.cvv, testDataForOrder.couponCode);

});
