import{Page, expect, Locator} from '@playwright/test';

export class DashboardPage{
    page:Page;
    products:Locator;
    constructor(page:Page){
        this.page=page;
        this.products=page.locator('.card-body');
    }
    
    async searchAndAddToCart(productName: string){
        await this.products.first().waitFor();
        await this.products.filter({hasText: productName}).getByRole('button', {name:" Add To Cart"}).click();
        await expect(this.page.getByText('Product Added To Cart') ).toBeVisible();
    }

    async navigateToCart(){
        await this.page.getByRole("listitem").getByRole('button', {name: 'Cart'}).click(); 
    }
}
