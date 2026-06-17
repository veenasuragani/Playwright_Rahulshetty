// Closure-based page helper factory
function createSearchHelper(page) {
  const baseUrl = 'https://example.com'; // captured in closure

  return {
    async search(term) {
      await page.goto(`${baseUrl}/search?q=${term}`);
      return page.locator('.result').count();
    }
  };
}

const helper = createSearchHelper(page);
const count = await helper.search('playwright');

//2nd
// fixtures.js
import { test as base } from '@playwright/test';

export const test = base.extend({
  adminPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('#user', 'admin');
    await page.fill('#pass', 'secret');
    await page.click('button.login');

    // page is captured in closure
    await use(page);
  }
});


//3rd
function createLoginPage(page) {
  const userField = page.locator('#user');
  const passField = page.locator('#pass');
  const loginBtn = page.locator('button.login');

  return {
    async login(username, password) {
      await userField.fill(username);
      await passField.fill(password);
      await loginBtn.click();
    }
  };
}

const login = createLoginPage(page);
await login.login('admin', 'secret');


//4th
function createSearchHelper(page) {
  const baseUrl = 'https://example.com';

  return {
    async search(term) {
      await page.goto(`${baseUrl}/search?q=${term}`);
    }
  };
}

//5th
function createApiHelper(request) {
  const base = 'https://api.example.com';

  return {
    async getUser(id) {
      return request.get(`${base}/users/${id}`);
    }
  };
}

const api = createApiHelper(request);
await api.getUser(10);

//6th
function createRoleActions(page, role) {
  return {
    async openDashboard() {
      await page.goto(`/dashboard?role=${role}`);
    }
  };
}

const adminActions = createRoleActions(page, 'admin');
await adminActions.openDashboard();

//7th
function createTableHelper(page, tableId) {
  return {
    row: (index) => page.locator(`#${tableId} tr`).nth(index),
    cell: (row, col) => page.locator(`#${tableId} tr`).nth(row).locator('td').nth(col)
  };
}

const table = createTableHelper(page, 'users');
await table.cell(2, 1).click();

//8th
function createCounter() {
  let count = 0;

  return {
    next() {
      return ++count;
    }
  };
}

const counter = createCounter();
console.log(counter.next()); // 1
console.log(counter.next()); // 2
