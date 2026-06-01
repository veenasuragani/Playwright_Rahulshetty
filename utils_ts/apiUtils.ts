export class ApiUtils {
    apiContext: any;

    constructor(apiContext: any) {
        this.apiContext = apiContext;
    }

    async getToken(loginPayload: any) {
        const loginResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
            data: loginPayload
        });
        const loginResponseJson = await loginResponse.json();
        return loginResponseJson.token;
    }

    async createOrder(orderPayload: any, token: string) {
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'content-type': 'application/json'
            }
        });
        const orderResponseJson = await orderResponse.json();
        return orderResponseJson.orders[0];
    }
}
