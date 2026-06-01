import {Page, Locator} from '@playwright/test';
export class CartPage{
    page:Page;
    productsInCart:Locator;
    checkoutButton:Locator;
    constructor(page:Page){
        this.page=page;
        this.productsInCart=this.page.locator('div li');
        this.checkoutButton=this.page.getByRole('button', { name: 'Checkout' });
    }

    async verifyProductInCart(productName: string){        
        await this.productsInCart.first().waitFor();
        await this.productsInCart.filter({hasText: productName}).isVisible();
    }

    async proceedToCheckout(){
        await this.checkoutButton.click();
    }   


}
