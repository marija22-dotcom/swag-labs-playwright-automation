import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';
import { PurchaseFlowData } from '../tests/DataTest';
import { faker } from '@faker-js/faker';

export class CheckoutPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly completeHeader: Locator;
  readonly errorMessage: Locator;

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

  // Method that fills checkout form with provided data
  async fillCheckoutInfo(firstName: string, lastName: string, zip: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(zip);
    await this.continueButton.click();
  }

  // Method that fills checkout form with random data
  async fillCheckoutWithRandomData(): Promise<void> {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zip = faker.location.zipCode(PurchaseFlowData.zipPattern);

    // Call the first method to avoid duplicating fill and click logic
    await this.fillCheckoutInfo(firstName, lastName, zip);
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