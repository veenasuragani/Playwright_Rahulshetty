const { test, expect } = require('@playwright/test');

const requiredtest = test.extend({ 
  
  // Fixture: page with user already logged in 
  loggedInPage: async ({ page }, use) => { 
    // SETUP 
    await page.goto('/login'); 
    await page.getByLabel('Email').fill('admin@test.com'); 
    await page.getByLabel('Password').fill('Admin@123'); 
    await page.getByRole('button', { name: 'Login' }).click(); 
    await page.waitForURL('**/dashboard'); 
     
    await use(page);   // ← test runs here (page is injected) 
     
    // TEARDOWN (runs after test finishes) 
    await page.goto('/logout'); 
  },
  
  // Fixture: API request context with auth header 
  authedRequest: async ({ playwright, request }, use) => { 
    const loginResponse = await request.post('/login', {
      data: {
        email: 'admin@test.com',
        password: 'Admin@123'
      }
    });
    const loginBody = await loginResponse.json();
    const token = loginBody.token || loginBody.accessToken;

    if (!token) {
      throw new Error(`Login failed. Response: ${await loginResponse.text()}`);
    }

    const context = await playwright.request.newContext({
      baseURL: 'https://api.example.com',
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    await use(context);
    await context.dispose(); // teardown: close context
  },

  // Fixture: created user (for tests that need a user) 
  testUser: async ({ request }, use) => { 
    // Create before test 
    const res = await request.post('/api/users', { 
      data: { name: 'Fixture User', email: `user_${Date.now()}@test.com` } 
    }); 
    const user = await res.json(); 
     
    await use(user);    // inject user object into test 
     
    // Delete after test 
    await request.delete(`/api/users/${user.id}`); 
  }, 

});

module.exports = { test: requiredtest, expect };

