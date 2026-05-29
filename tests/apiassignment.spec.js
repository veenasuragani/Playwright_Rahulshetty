const { test, expect } = require('@playwright/test');
const { Login } = require('./Login.helper');
const baseURL = 'https://eventhub.rahulshettyacademy.com';
const SIX_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
    { id: 5, title: 'Lollapalooza India', category: 'Festival', eventDate: '2025-06-20T12:00:00.000Z', venue: 'Mahalaxmi Racecourse', city: 'Mumbai', price: '3000', totalSeats: 5000, availableSeats: 2000, imageUrl: null, isStatic: false },
    { id: 6, title: 'AI & ML Expo', category: 'Conference', eventDate: '2025-06-25T10:00:00.000Z', venue: 'Bangalore International Exhibition Centre', city: 'Bangalore', price: '750', totalSeats: 300, availableSeats: 180, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 6, limit: 12 },
};

const FOUR_EVENTS_RESPONSE = {
  data: [
    { id: 1, title: 'Tech Summit 2025', category: 'Conference', eventDate: '2025-06-01T10:00:00.000Z', venue: 'HICC', city: 'Hyderabad', price: '999', totalSeats: 200, availableSeats: 150, imageUrl: null, isStatic: false },
    { id: 2, title: 'Rock Night Live', category: 'Concert', eventDate: '2025-06-05T18:00:00.000Z', venue: 'Palace Grounds', city: 'Bangalore', price: '1500', totalSeats: 500, availableSeats: 300, imageUrl: null, isStatic: false },
    { id: 3, title: 'IPL Finals', category: 'Sports', eventDate: '2025-06-10T19:30:00.000Z', venue: 'Chinnaswamy', city: 'Bangalore', price: '2000', totalSeats: 800, availableSeats: 50, imageUrl: null, isStatic: false },
    { id: 4, title: 'UX Design Workshop', category: 'Workshop', eventDate: '2025-06-15T09:00:00.000Z', venue: 'WeWork', city: 'Mumbai', price: '500', totalSeats: 50, availableSeats: 20, imageUrl: null, isStatic: false },
  ],
  pagination: { page: 1, totalPages: 1, total: 4, limit: 12 },
};

test('API Intercepting with Six Events', async ({ page }) => {

  await page.route('**/api/events**',
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(SIX_EVENTS_RESPONSE);
      let contentType = "application/json";
      let status = 200;
      await route.fulfill({
        response,
        body,
        contentType,
        status,
      })

    }
  )
  await Login(page, baseURL, 'suragani.veena@gmail.com', 'S.veena@1217');
  await page.getByTestId('nav-events').click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#event-card').first()).toBeVisible();
  const eventCards = page.locator('#event-card');
  await expect(eventCards).toHaveCount(6);
  await expect(page.locator('div').filter({ hasText: 'Your sandbox holds up to 9' }).nth(1)).toBeVisible();
  await expect(page.getByRole('main')).toContainText('9 bookings');

});


test.only('API Intercepting with Four Events', async ({ page }) => {

  await page.route('**/api/events**',
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(FOUR_EVENTS_RESPONSE);
      let contentType = "application/json";
      let status = 200;
      await route.fulfill({
        response,
        body,
        contentType,
        status,
      })

    }
  )
  await Login(page, baseURL, 'suragani.veena@gmail.com', 'S.veena@1217');
  await page.getByTestId('nav-events').click();
  await page.waitForLoadState('networkidle');
  await expect(page.locator('#event-card').first()).toBeVisible();
  const eventCards = page.locator('#event-card');
  await expect(eventCards).toHaveCount(4);
  await expect(page.locator('div').filter({ hasText: 'Your sandbox holds up to 9' }).nth(1)).not.toBeVisible();

});