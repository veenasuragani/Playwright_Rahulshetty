# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: EndToEndPO.spec.js >> @web end to end test with ZARA COAT 3 using fixture
- Location: tests\EndToEndPO.spec.js:34:1

# Error details

```
Test timeout of 40000ms exceeded.
```

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Thankyou for the order. ')
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 50000ms
  - waiting for getByText('Thankyou for the order. ')

```

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "Get Shortlisted by Recruiters - Take QA Skill Assessments on TechSmartHire":
    - /url: https://techsmarthire.com/
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart 1"
    - listitem:
      - button "Sign Out"
- text: "ZARA COAT 3 $ 11500 Quantity: 1"
- list:
  - listitem: Apple phone
- text: Payment Method Credit Card Paypal SEPA Invoice Personal Information Credit Card Number
- textbox: 4542 9931 9292 2293
- text: Expiry Date
- combobox:
  - option "01" [selected]
  - option "02"
  - option "03"
  - option "04"
  - option "05"
  - option "06"
  - option "07"
  - option "08"
  - option "09"
  - option "10"
  - option "11"
  - option "12"
- combobox:
  - option "01"
  - option "02"
  - option "03"
  - option "04"
  - option "05"
  - option "06"
  - option "07"
  - option "08"
  - option "09"
  - option "10"
  - option "11"
  - option "12"
  - option "13"
  - option "14"
  - option "15"
  - option "16" [selected]
  - option "17"
  - option "18"
  - option "19"
  - option "20"
  - option "21"
  - option "22"
  - option "23"
  - option "24"
  - option "25"
  - option "26"
  - option "27"
  - option "28"
  - option "29"
  - option "30"
  - option "31"
- text: CVV Code ?
- textbox: "123"
- text: Name on Card
- textbox: Veena Suragani
- text: Apply Coupon
- textbox: rahulshettyacademy
- paragraph: "* Coupon Applied"
- button "Apply Coupon"
- text: Shipping Information suragani.veena@gmail.com
- textbox: suragani.veena@gmail.com
- textbox "Select Country": India
- text: Place Order
```

# Test source

```ts
  1  | const {expect} = require('@playwright/test');
  2  | 
  3  | class CheckoutPage {
  4  |     constructor(page) {
  5  |         this.page = page;
  6  |         this.countryInput = this.page.getByPlaceholder('Select Country');
  7  |         this.indiaOption = this.page.getByRole('button', { name: 'India' }).nth(1);
  8  |         this.userEmailLabel = this.page.locator(".user__name label");
  9  |         this.nameOnCardINput = this.page.getByText('Name on Card ').locator('..').locator('input');
  10 |         this.cvvInput = this.page.getByText('CVV Code ').locator('..').locator('input');
  11 |         this.couponInput = this.page.getByText('Apply Coupon ').locator('..').locator('input');
  12 |         this.applyCouponButton = this.page.getByRole('button', { name: 'Apply Coupon' });
  13 |         this.couponAppliedMessage = this.page.getByText('* Coupon Applied');
  14 |         this.placeOrderButton = this.page.getByText('Place Order ');
  15 |         this.orderConfirmationMessage = this.page.getByText('Thankyou for the order. ');
  16 |     }
  17 | 
  18 |     async checkoutandplaceorder(email, country,nameOnCard, cvv, couponCode) {
  19 |         await this.countryInput.pressSequentially(country, { delay: 150 });
  20 |         await this.indiaOption.click();
  21 |         await expect(this.userEmailLabel).toHaveText(email);
  22 |         await this.nameOnCardINput.fill(nameOnCard);
  23 |         await this.cvvInput.fill(cvv);
  24 |         await this.couponInput.fill(couponCode);
  25 |         await this.applyCouponButton.click();
  26 |         await expect(this.couponAppliedMessage).toBeVisible();
  27 |         await this.placeOrderButton.click();
> 28 |         await expect(this.orderConfirmationMessage).toBeVisible();
     |                                                     ^ Error: expect(locator).toBeVisible() failed
  29 |     }
  30 | 
  31 | 
  32 | 
  33 | }
  34 | module.exports = CheckoutPage;
```