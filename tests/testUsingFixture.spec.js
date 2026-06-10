 
// ─── tests/dashboard.spec.js — using fixtures ────────────────── 
const { test, expect } = require('../utils/fixtures'); 
  
test('dashboard shows welcome message', async ({ loggedInPage }) => { 
  await expect(loggedInPage.locator('h1')).toContainText('Dashboard'); 
}); 
  
test('can edit own profile', async ({ loggedInPage, testUser }) => { 
  await loggedInPage.goto(`/users/${testUser.id}`); 
  await expect(loggedInPage.locator('.user-name')).toContainText(testUser.name); 
}); 