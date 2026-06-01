import{Page, expect, Locator} from '@playwright/test';

export class CheckoutPage {
    page:Page;
    countryInput:Locator;
    indiaOption:Locator;
    userEmailLabel:Locator;
    nameOnCardINput:Locator;
    cvvInput:Locator;
    couponInput:Locator;
    applyCouponButton:Locator;
    couponAppliedMessage:Locator;
    placeOrderButton:Locator;
    orderConfirmationMessage:Locator;

    constructor(page: Page) {
        this.page = page;
        this.countryInput = this.page.getByPlaceholder('Select Country');
        this.indiaOption = this.page.getByRole('button', { name: 'India' }).nth(1);
        this.userEmailLabel = this.page.locator(".user__name label");
        this.nameOnCardINput = this.page.getByText('Name on Card ').locator('..').locator('input');
        this.cvvInput = this.page.getByText('CVV Code ').locator('..').locator('input');
        this.couponInput = this.page.getByText('Apply Coupon ').locator('..').locator('input');
        this.applyCouponButton = this.page.getByRole('button', { name: 'Apply Coupon' });
        this.couponAppliedMessage = this.page.getByText('* Coupon Applied');
        this.placeOrderButton = this.page.getByText('Place Order ');
        this.orderConfirmationMessage = this.page.getByText('Thankyou for the order. ');
    }

    async checkoutandplaceorder(email: string, country: string, nameOnCard: string, cvv: string, couponCode: string ) {
        await this.countryInput.pressSequentially(country, { delay: 150 });
        await this.indiaOption.click();
        await expect(this.userEmailLabel).toHaveText(email);
        await this.nameOnCardINput.fill(nameOnCard);
        await this.cvvInput.fill(cvv);
        await this.couponInput.fill(couponCode);
        await this.applyCouponButton.click();
        await expect(this.couponAppliedMessage).toBeVisible();
        await this.placeOrderButton.click();
        await expect(this.orderConfirmationMessage).toBeVisible();
    }



}
