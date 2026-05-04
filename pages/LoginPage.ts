import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly errorMessage: Locator;

  // Initializes login-page locators.
  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginBtn = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.locator('[data-test="error"]');
  }

  // Performs login action with provided credentials.
  async login(userName: string, password: string): Promise<void> {
    await this.usernameInput.fill(userName);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  // Verifies successful login by checking inventory URL.
  async assertSuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  }

  // Verifies expected login error message is displayed.
  async assertErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}