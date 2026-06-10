const { LoginPage } = require('../pages/LoginPage'); 
const { test, expect } = require('@playwright/test'); 
  
test.describe('User management', () => { 
  let userId;         // shared across tests in this block 
  let loginPage; 
  
//   test.beforeAll(async ({ request }) => { 
//     // Runs ONCE — create shared test data via API 
//     const res = await request.post('/api/users', { 
//       data: { name: 'Shared Test User', email: 'shared@test.com' } 
//     }); 
//     const body = await res.json(); 
//     userId = body.id; 
//     console.log('Created user:', userId); 
//   }); 
  
//   test.afterAll(async ({ request }) => { 
//     // Runs ONCE — clean up shared data 
//     await request.delete(`/api/users/${userId}`); 
//     console.log('Deleted user:', userId); 
//   }); 
  
//   test.beforeEach(async ({ page }) => { 
//     // Runs before EVERY test — navigate to starting page 
//     loginPage = new LoginPage(page); 
//     await loginPage.navigate(); 
//     await loginPage.login('admin@test.com', 'Admin@123'); 
//     await page.waitForURL('**/dashboard'); 
//   }); 
  
//   test.afterEach(async ({ page }, testInfo) => { 
//     // Runs after EVERY test — capture screenshot on failure 
//     if (testInfo.status !== testInfo.expectedStatus) { 
//       await page.screenshot({ 
//         path: `screenshots/FAIL_${testInfo.title.replace(/\s/g, '_')}.png`, 
//         fullPage: true 
//       }); 
//       console.log('Test failed:', testInfo.title); 
//     } 
//   }); 
  
  test('user appears in list', async ({ page }) => { 
    await page.goto('/admin/users'); 
    await expect(page.locator(`text=shared@test.com`)).toBeVisible(); 
  }); 
  
  test('user can be edited', async ({ page }) => { 
    // ... 
  }); 
}); 