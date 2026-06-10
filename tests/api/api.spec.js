await page.route('**/api/products', route => { 
  route.fulfill({ 
    status: 200, 
    contentType: 'application/json', 
    body: JSON.stringify([ { id: 1, name: 'Mocked Product', price: 999 } 
    ]) 
  }); 
}); 
  
// ── MOCK ERROR RESPONSE ──────────────────────────────────────────── 
test('UI shows error message on server error', async ({ page }) => { 
  await page.route('**/api/orders', route => { 
    route.fulfill({ status: 500, body: 'Server Error' }); 
  }); 
  await page.goto('/orders'); 
  await expect(page.locator('.error-banner')).toBeVisible(); 
  await expect(page.locator('.error-banner')).toContainText('Something went wrong'); 
}); 
  
// ── MOCK 401 UNAUTHORIZED ───────────────────────────────────────── 
test('shows login redirect on 401', async ({ page }) => { 
  await page.route('**/api/**', route => { 
    route.fulfill({ status: 401, body: JSON.stringify({ error: 
'Unauthorized' }) }); 
  }); 
  await page.goto('/dashboard'); 
  await expect(page).toHaveURL(/login/); 
}); 
  
// ── MODIFY REQUEST (add headers) ────────────────────────────────── 
await page.route('**/api/**', route => { 
  route.continue({ 
    headers: { 
      ...route.request().headers(), 
      'X-Test-ID': 'playwright-test-123', 
      'Authorization': 'Bearer test-token' 
    } 
  }); 
}); 
  
// ── ABORT (block requests) ──────────────────────────────────────── 
await page.route('**/*.{png,jpg,gif,svg,ico}', r => r.abort()); // block images 
await page.route('**/analytics/**', r => r.abort());             // block tracking 
await page.route('**/ads/**', r => r.abort());                   // block ads 
  
// ── INSPECT REQUESTS AND RESPONSES ─────────────────────────────── 
page.on('request', req => { 
  console.log('>>', req.method(), req.url()); 
}); 
page.on('response', res => { 
  console.log('<<', res.status(), res.url()); 
}); 
  
// ── REMOVE ROUTE ────────────────────────────────────────────────── 
await page.unroute('**/api/products');    // remove specific route 
await page.unrouteAll();                  // remove all routes 
  
// ── UI + API COMBINED TEST ──────────────────────────────────────── 
test('create via API then verify in UI', async ({ page, request }) => { 
  // Create test data via API (fast) 
  const createRes = await request.post('/api/users', { 
    data: { name: 'API User', email: 'api@test.com' } 
  }); 
  const user = await createRes.json(); 
  
  // Verify in UI 
  await page.goto('/admin/users'); 
await expect(page.locator(`tr:has-text("${user.email}")`)).toBeVisible(); 
// Delete via UI 
await page.locator('tr').filter({ hasText: user.email }) 
.getByRole('button', { name: 'Delete' }).click(); 
// Verify deletion via API 
const checkRes = await request.get(`/api/users/${user.id}`); 
expect(checkRes.status()).toBe(404); 
}); 