import { test as base, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authToken: string;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }: { page: Page }, use: (loginPage: LoginPage) => void) =>
    use(new LoginPage(page)),

  dashboardPage: async ({ page }: { page: Page }, use: (dashboardPage: DashboardPage) => void) =>
    use(new DashboardPage(page)),

  authToken: async ({}, use: (authToken: string) => void) =>
    use(process.env.AUTH_TOKEN!),
});

export { expect } from '@playwright/test';