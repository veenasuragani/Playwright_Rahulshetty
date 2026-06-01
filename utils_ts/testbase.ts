import {test as baseTest} from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
    country: string;
    nameOnCard: string;
    cvv: string;
    couponCode: string;
}

export const customtest = baseTest.extend<{ testDataForOrder: TestDataForOrder }>({
    testDataForOrder: {
            username: "suragani.veena@gmail.com",
            password: "S.veena@1217",
            productName: "ZARA COAT 3",
            country: "Ind",
            nameOnCard: "Veena Suragani",
            cvv: "123",
            couponCode: "rahulshettyacademy"
        }
});