class CartPage{
    constructor(page){
        this.page=page;
        this.productsInCart=this.page.locator('div li');
        this.checkoutButton=this.page.getByRole('button', { name: 'Checkout' });

    }

    async verifyProductInCart(productName){
        
        await this.productsInCart.first().waitFor();
        await this.productsInCart.filter({hasText: productName}).isVisible();
    }

    async proceedToCheckout(){
        await this.checkoutButton.click();
    }   


}
module.exports = CartPage;