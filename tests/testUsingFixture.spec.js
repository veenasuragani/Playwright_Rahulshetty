// ─── tests/testUsingFixture.spec.js — using fixtures ──────────────────
const { test, expect } = require('../utils/fixtures');

test('dashboard shows welcome message', async ({ loggedInPage }) => {
  await expect(loggedInPage.locator('h1')).toContainText('Dashboard');
});

test('can edit own profile', async ({ loggedInPage, testUser }) => {
  await loggedInPage.goto(`/users/${testUser.id}`);
  await expect(loggedInPage.locator('.user-name')).toContainText(testUser.name);
});

test('can call protected API with auth fixture', async ({ authedRequest }) => {
  const response = await authedRequest.get('/users/me');
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  expect(body).toBeDefined();
});

test('can create a resource via POST request', async ({ authedRequest }) => {
  const response = await authedRequest.post('/users', {
    data: {
      name: 'Fixture User',
      email: `user_${Date.now()}@test.com`
    }
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toBeDefined();
});

test('can update a resource via PUT request', async ({ authedRequest }) => {
  const response = await authedRequest.put('/users/1', {
    data: {
      name: 'Updated User'
    }
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toBeDefined();
});

test('can delete a resource via DELETE request', async ({ authedRequest }) => {
  const response = await authedRequest.delete('/users/1');
  expect(response.ok()).toBeTruthy();
});