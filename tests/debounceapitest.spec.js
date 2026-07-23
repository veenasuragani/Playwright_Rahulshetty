import {test, expect} from '@playwright/test';

test('debounce api test', async({page})=>{
    await page.goto('https://search/api/');
    const results = [];

    await page.route('**/api/search**', async(route) => {
        results.push(route.request().url());
        route.fulfill({
            status: 200,
            contentType: 'applicatin/json',
            body: JSON.stringify({
                results: ['Laptop', 'Laptop Stand', 'Laptop Bag']
            })
        })
    });
    const search_box=await page.locator('search');
    await search_box.pressSequentially('play',{delay:100});
    await page.waitForResponse(res=>res.url('**/api/search**').includes('')&&res.status===200)

    expect(results.length).toBe(1);

     // Validate UI updated with results
  const items = page.locator('.result-item');
  await expect(items).toHaveCount(3);
  await expect(items.first()).toHaveText('Laptop');
});