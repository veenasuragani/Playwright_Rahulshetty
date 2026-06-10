const {expect} = require('@playwright/test');

class DashboardPage{
    constructor(page){
        this.page=this.page;
        this.products=this.page.locator('.card-body');
    }
    
    async searchAndAddToCart(productName){
        await this.products.first().waitFor();
        await this.products.filter({hasText: productName}).getByRole('button', {name:" Add To Cart"}).click();
        await expect(this.page.getByText('Product Added To Cart') ).toBeVisible();
    }

    async navigateToCart(){
        await this.page.getByRole("listitem").getByRole('button', {name: 'Cart'}).click(); 
    }
}

module.exports = DashboardPage;