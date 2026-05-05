import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';

const BASE_URL = 'https://www.saucedemo.com';


type Fixtures = {
  loginPage: LoginPage;
  checkoutPage: CheckoutPage;
  productPage: ProductPage;
};

// Extends base test with a shared LoginPage fixture.
export const test = base.extend<Fixtures>({
  // Creates a LoginPage object for each test.
  loginPage: async ({ page }, use) => {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await use(new LoginPage(page));
  },
  checkoutPage: async ({page}, use) => {
    await use(new CheckoutPage(page));
  },
  productPage: async ({page}, use) => {
    await use(new ProductPage(page));
  }
});


export { expect };