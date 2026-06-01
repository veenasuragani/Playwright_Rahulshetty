const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const POManager = require('../../pages/POManager');

Given('a login to Ecommerace application with {string} and {string}', async function (username, password) {
    const loginpage = this.poManager.getLoginPage();
    await loginpage.goTo();
    await loginpage.validLogin(username, password);
});

When('I add {string} to cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchAndAddToCart(productName);
    await this.dashboardPage.navigateToCart();
});

Then('I verify {string} is displayed in cart page', async function (productName) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.verifyProductInCart(productName);
    await this.cartPage.proceedToCheckout();
});

When('I enter valid deatils {string}, {string}, {string}, {string}, {string} and place order in the checkout page', async function (email, country, nameOnCard, cvv, couponCode) {
    this.checkoutPage = this.poManager.getCheckoutPage();
    await this.checkoutPage.checkoutandplaceorder(email, country, nameOnCard, cvv, couponCode);
});