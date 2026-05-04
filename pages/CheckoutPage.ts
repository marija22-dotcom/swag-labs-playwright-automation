import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;

  // Initializes checkout page locators.
  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('[data-test="firstName"]');
    this.lastNameInput = page.locator('[data-test="lastName"]');
    this.postalCodeInput = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Fills checkout form and continues to overview step.
  async fillCheckoutInfo(firstName: string, lastName: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  // Clicks Finish to complete the order.
  async finishOrder(): Promise<void> {
    await this.finishButton.click();
  }

  // Verifies checkout completion header text.
  async assertOrderCompleted(expectedHeader: string): Promise<void> {
    await expect(this.completeHeader).toHaveText(expectedHeader);
  }
}
