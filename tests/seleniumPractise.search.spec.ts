// spec: tests/seleniumPractise.testplan.md
// seed: tests/seed.spec.ts

import { test, expect, Locator, Page } from '@playwright/test';

class GreenKartPage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly products: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input.search-keyword');
    this.products = page.locator('.products .product');
  }

  async goto() {
    await this.page.goto('https://rahulshettyacademy.com/seleniumPractise/');
  }

  async search(term: string) {
    await this.searchInput.fill(term);
    await expect(this.page.locator('.products .product h4', { hasText: new RegExp(term, 'i') })).toBeVisible({ timeout: 5000 });
  }

  async visibleProductCount(): Promise<number> {
    const count = await this.products.count();
    let visibleCount = 0;
    for (let i = 0; i < count; i++) {
      if (await this.products.nth(i).isVisible()) {
        visibleCount++;
      }
    }
    return visibleCount;
  }

  async getVisibleProductTitles(): Promise<string[]> {
    const titles: string[] = [];
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const product = this.products.nth(i);
      if (await product.isVisible()) {
        titles.push((await product.locator('h4').textContent())?.trim() ?? '');
      }
    }
    return titles;
  }

  async refresh() {
    await this.page.reload();
  }
}

test.describe('GreenKart Product Search and Filter', () => {
  test('Search filters matching products and refresh restores the full catalog', async ({ page }) => {
    const greenKart = new GreenKartPage(page);

    // 1. Navigate to the GreenKart homepage
    await greenKart.goto();

    // 2. Verify the search input is present with the expected placeholder
    await expect(greenKart.searchInput).toHaveAttribute('placeholder', 'Search for Vegetables and Fruits');

    // 3. Search for a product term and validate filtering
    await greenKart.search('tom');
    const visibleTitles = await greenKart.getVisibleProductTitles();
    expect(visibleTitles.length).toBeGreaterThanOrEqual(1);
    expect(visibleTitles).toContain('Tomato - 1 Kg');
    visibleTitles.forEach((title) => expect(title.toLowerCase()).toContain('tom'));

    // 4. Reset the page and validate the full product list is visible again
    await greenKart.refresh();
    expect(await greenKart.visibleProductCount()).toBe(await greenKart.products.count());
  });
});