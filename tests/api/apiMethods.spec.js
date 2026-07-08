const { test, expect } = require('@playwright/test');
import Ajv from "ajv";




const loginPayload = { email: "suragani.veena@gmail.com", password: "S.veena@1217" };
const eventpayload = {
  title: "Tech Summit 2026",
  description: "A premier technology conference.",
  category: "Conference",
  venue: "Bangalore International Centre",
  city: "Bangalore",
  eventDate: "2026-06-15T09:00:00.000Z",
  price: 1500,
  totalSeats: 500,
  imageUrl: "https://example.com/banner.jpg"
}
let token;
let eventId;
let responseBody;

// ── GET ─────────────────────────────────────────────────────────── 
test.beforeAll('POST /api/auth/login returns token', async ({ request }) => {
  const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/auth/login', { data: loginPayload });

  expect(response.status()).toBe(200);
  expect(response).toBeOK();

  responseBody = await response.json();
  token = responseBody.token;
  console.log(token);
});

test('POST /api/events creates event', async ({ request }) => {
  const response = await request.post('https://api.eventhub.rahulshettyacademy.com/api/events', {
    data: eventpayload,
    headers: { Authorization: `Bearer ${token}` }
  });

  expect(response.status()).toBe(201);
  expect(response).toBeOK();
  const responseBody = await response.json();
  eventId = responseBody.data.id;
  console.log(eventId);
});

test('GET /api/events returns list', async ({ request }) => {
  const response = await request.get('https://api.eventhub.rahulshettyacademy.com/api/events', {
    params: { category: "Conference", city: "Bangalore", search: "summit", page: 1, limit: 10 },
    headers: { Authorization: `Bearer ${token}` }
  });

  expect(response.status()).toBe(200);
  expect(response).toBeOK();
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody).toBeTruthy();
});

test('put /api/events/:id updates event', async ({ request }) => {
  expect(eventId).toBeTruthy();

  const response = await request.put(`https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`, {
    data: { ...eventpayload, title: "Tech Summit 2026 - Updated" },
    headers: { Authorization: `Bearer ${token}` }
    });
    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response).toBeOK();

  });  
  
  test('delete /api/events/:id deletes event', async ({ request }) => {
    expect(eventId).toBeTruthy();
    const response = await request.delete(`https://api.eventhub.rahulshettyacademy.com/api/events/${eventId}`, {
      headers: { Authorization: `Bearer ${token}` }
    }); 
    console.log(await response.json());
    expect(response.status()).toBe(200);
    expect(response).toBeOK();
  });

  const ajv = new Ajv();

const schema = {
  type: "object",
  required: ["id", "name", "status"],
  properties: {
    id: { type: "number" },
    name: { type: "string" },
    status: { type: "string" }
  }
};

const validate = ajv.compile(schema);
const isValid = validate(responseBody);

if (!isValid) {
  console.log(validate.errors);}