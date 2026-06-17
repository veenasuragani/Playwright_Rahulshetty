import { test as base } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { DashboardPage } from '@pages/DashboardPage';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authToken: string;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) =>
    use(new LoginPage(page)),

  dashboardPage: async ({ page }, use) =>
    use(new DashboardPage(page)),

  authToken: async ({}, use) =>
    use(process.env.AUTH_TOKEN!),
});

export { expect } from '@playwright/test';