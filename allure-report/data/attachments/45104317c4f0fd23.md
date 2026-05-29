# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndPO.spec.js >> @web end to end test with ZARA COAT 3 using fixture
- Location: tests\EndToEndPO.spec.js:34:1

# Error details

```
Error: locator.click: Target page, context or browser has been closed
Call log:
  - waiting for getByRole('listitem').getByRole('button', { name: 'Cart' })
    - locator resolved to <button tabindex="0" _ngcontent-xug-c38="" class="btn btn-custom" routerlink="/dashboard/cart">…</button>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - element is outside of the viewport
    - retrying click action
      - waiting 100ms
    23 × waiting for element to be visible, enabled and stable
       - element is visible, enabled and stable
       - scrolling into view if needed
       - done scrolling
       - element is outside of the viewport
     - retrying click action
       - waiting 500ms
    - waiting for element to be visible, enabled and stable

```

# Test source

```ts
  1  | const {expect} = require('@playwright/test');
  2  | 
  3  | class DashboardPage{
  4  |     constructor(page){
  5  |         this.page=page;
  6  |         this.products=page.locator('.card-body');
  7  |     }
  8  |     
  9  |     async searchAndAddToCart(productName){
  10 |         await this.products.first().waitFor();
  11 |         await this.products.filter({hasText: productName}).getByRole('button', {name:" Add To Cart"}).click();
  12 |         await expect(this.page.getByText('Product Added To Cart') ).toBeVisible();
  13 |     }
  14 | 
  15 |     async navigateToCart(){
> 16 |         await this.page.getByRole("listitem").getByRole('button', {name: 'Cart'}).click(); 
     |                                                                                   ^ Error: locator.click: Target page, context or browser has been closed
  17 |     }
  18 | }
  19 | 
  20 | module.exports = DashboardPage;
```