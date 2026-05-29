const {test, expect} = require('@playwright/test');
const {Login} = require('./Login.helper');
const baseURL = 'https://eventhub.rahulshettyacademy.com';

test('End to End flow', async({page})=>{
    await Login(page,baseURL, 'suragani.veena@gmail.com', 'S.veena@1217');
    await page.getByRole('button', {name: 'Admin'}).click();
    await page.locator('a').filter({ hasText: 'Manage Events' }).first().click();
    await page.waitForLoadState('networkidle');
    const eventTitle = `playwrightevent_${Date.now()}`;
    await page.getByLabel('Title').fill(eventTitle);
    await page.getByRole('textbox', { name: 'Describe the event…' }).fill('This is an event created by Playwright');
    await page.getByLabel('Category*').selectOption('Conference');
    await page.getByLabel('Venue*').fill('Plano,USA');
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-06-24T08:00');
    await page.getByLabel('Total Seats*').fill('100');
    await page.getByLabel('City*').fill('Plano');
    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('50');
    await page.getByTestId('add-event-btn').click();
    await expect(page.getByText('Event created!')).toBeVisible();

    await page.getByTestId('nav-events').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#event-card').first()).toBeVisible();
    await expect(page.locator('#event-card').filter({ hasText: eventTitle })).toBeVisible();
    const seatcountBeforeBooking = await page.locator('#event-card').filter({ hasText: eventTitle }).locator('.text-xs').last().textContent();
    const seatsBeforeBooking=parseInt(seatcountBeforeBooking.match(/\d+/)[0], 10);
    console.log(seatsBeforeBooking);

    await page.getByTestId('event-card').filter({ hasText: eventTitle }).locator('#book-now-btn').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#ticket-count')).toHaveText("1");
    await page.locator('#customerName').fill('Veena Suragani');
    await page.getByLabel('Email*').fill('aarnaannam@gmail.com');
    await page.getByLabel('Phone Number*').fill('1234567890');
    await page.getByRole('button', { name: 'Confirm Booking' }).click();
    const bookingReference = await page.locator('.booking-ref').first().textContent();
    const trimmedBookingReference = bookingReference.trim();
    console.log(trimmedBookingReference);
    console.log(bookingReference);

    await page.getByRole('button', {name: 'View My Bookings'}).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(`${baseURL}/bookings`);
    await page.locator('#booking-card').first().waitFor();
    await expect(page.locator('#booking-card').first()).toBeVisible();
    await expect(page.getByText(trimmedBookingReference)).toBeVisible();
    //await expect(page.locator('#booking-card')).locator('h3').filter({ hasText: eventTitle }).toBeVisible();


    await page.getByRole('link', {name: 'Events'}).first().click();
    await page.waitForLoadState('networkidle');
    await page.locator("[data-testid='event-card']").first().waitFor();
    await expect(page.getByTestId('event-card').first()).toBeVisible();
    await expect(page.getByTestId('event-card').filter({ hasText: eventTitle })).toBeVisible();
    
    const seatcountAfterBooking= await page.getByTestId('event-card').filter({ hasText: eventTitle }).locator('.text-xs').last().textContent();
    const seatsAfterBooking=parseInt(seatcountAfterBooking.match(/\d+/)[0], 10);    
    console.log(seatsAfterBooking);

    expect(seatsBeforeBooking - seatsAfterBooking).toBe(1);

})