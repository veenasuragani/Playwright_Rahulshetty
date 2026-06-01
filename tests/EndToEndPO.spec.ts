import { test, expect, Locator, Page } from '@playwright/test';
import { customtest } from '../utils_ts/testbase';
import { POManager } from '../pages_ts/POManager';

interface TestDataItem {
    username: string;
    password: string;
    productName: string;
    country: string;
    nameOnCard: string;
    cvv: string;
    couponCode: string;
}

const Testdata: TestDataItem[] = JSON.parse(JSON.stringify(require('../utils_ts/productTestData.json')));

// test.describe.configure({ mode: 'serial' });
for (const data of Testdata) {
    test(`@web end to end test with ${data.productName}`, async ({ page }: { page: Page }) => {
        const email: string = data.username;
        const password: string = data.password;
        const products: Locator = page.locator('.card-body');
        const productName: string = data.productName;

        const poManager: POManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(email, password);
        await page.waitForLoadState('networkidle');

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchAndAddToCart(productName);
        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.verifyProductInCart(productName);
        await cartPage.proceedToCheckout();

        const checkoutPage = poManager.getCheckoutPage();
        await checkoutPage.checkoutandplaceorder(email, data.country, data.nameOnCard, data.cvv, data.couponCode);
    });
}

customtest('@web end to end test with ZARA COAT 3 using fixture', async ({ page, testDataForOrder }) => {
    const email: string = testDataForOrder.username;
    const password: string = testDataForOrder.password;
    const products: Locator = page.locator('.card-body');
    const productName: string = testDataForOrder.productName;

    const poManager: POManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(email, password);
    await page.waitForLoadState('networkidle');

    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchAndAddToCart(productName);
    await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.verifyProductInCart(productName);
    await cartPage.proceedToCheckout();

    const checkoutPage = poManager.getCheckoutPage();
    await checkoutPage.checkoutandplaceorder(email, testDataForOrder.country, testDataForOrder.nameOnCard, testDataForOrder.cvv, testDataForOrder.couponCode);
});
