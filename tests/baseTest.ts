import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

const BASE_URL = 'https://www.saucedemo.com';


type Fixtures = {
  loginPage: LoginPage;
};

// Extends base test with a shared LoginPage fixture.
export const test = base.extend<Fixtures>({
  // Creates a LoginPage object for each test.
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

// Opens the application before each test starts.
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
});

export { expect };