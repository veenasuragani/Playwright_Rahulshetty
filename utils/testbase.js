const { test, expect } = require('@playwright/test');

const customtest=test.extend({
    testDataForOrder:
    {
    username: "suragani.veena@gmail.com",
    password: "S.veena@1217",
    productName: "ZARA COAT 3",
    country: "Ind",
    nameOnCard: "Veena Suragani",
    cvv: "123",
    couponCode: "rahulshettyacademy"
}


})
module.exports={customtest};