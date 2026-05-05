import { CheckoutPage } from '../pages/CheckoutPage';
import { ProductPage } from '../pages/ProductPage';
import { faker } from '@faker-js/faker';
import { Credentials, PurchaseFlowData } from './DataTest';
import { expect, test } from './baseTest';

// Logs in, adds two items, checks out, and completes a purchase.
test('Complete purchase with two products', async ({ loginPage, page,checkoutPage,productPage }) => {
 

  // Login with valid user.
  await loginPage.login(
    Credentials.validUser.validUserName,
    Credentials.validUser.validPassword,
  );
  await loginPage.assertSuccessfulLogin();

  // Add two products using dynamic product locator helper.
  await productPage.addItemsToCart(PurchaseFlowData.products);
  await productPage.assertCartBadgeCount(PurchaseFlowData.expectedCartCount);

  // Open cart and start checkout.
  await productPage.openCart();
  await productPage.startCheckout();

  // Fill checkout information with faker-generated data.
  await checkoutPage.fillCheckoutWithRandomData();

  // Finish order and assert success confirmation.
  await checkoutPage.finishOrder();
  await checkoutPage.assertOrderCompleted(PurchaseFlowData.expectedSuccessHeader);
});

// Verifies checkout validation when required customer info is missing.
test('Should show error message when checkout info is missing', async ({ loginPage, page ,checkoutPage,productPage}) => {
 

  await loginPage.login(
    Credentials.validUser.validUserName,
    Credentials.validUser.validPassword,
  );
  await loginPage.assertSuccessfulLogin();

  await productPage.addItemToCart('Backpack');
  await productPage.openCart();
  await productPage.startCheckout();

  // Click continue without filling checkout form.
  await checkoutPage.continueButton.click();

  await expect(checkoutPage.errorMessage).toContainText('Error: First Name is required');
});
