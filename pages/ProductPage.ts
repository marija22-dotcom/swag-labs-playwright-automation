import { expect, type Locator, type Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ProductPage extends BasePage {
  readonly pageTitle: Locator;
  readonly inventoryContainer: Locator;
  readonly inventoryItems: Locator;

  readonly cartLink: Locator;
  readonly cartBadge: Locator;

  readonly menuButton: Locator;
  readonly allItemsLink: Locator;
  readonly aboutLink: Locator;
  readonly logoutLink: Locator;
  readonly resetAppStateLink: Locator;

  readonly sortDropdown: Locator;

  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  // Initializes all key locators used on SauceDemo product/inventory page.
  constructor(page: Page) {
    super(page);

    this.pageTitle = page.locator('[data-test="title"]');
    this.inventoryContainer = page.locator('[data-test="inventory-container"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');

    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');

    this.menuButton = page.locator('#react-burger-menu-btn');
    this.allItemsLink = page.locator('[data-test="inventory-sidebar-link"]');
    this.aboutLink = page.locator('[data-test="about-sidebar-link"]');
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
    this.resetAppStateLink = page.locator('[data-test="reset-sidebar-link"]');

    this.sortDropdown = page.locator('[data-test="product-sort-container"]');

    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  // Adds a product to cart using dynamic data-test locator.
  async addItemToCart(productName: string): Promise<void> {
    const formattedName = productName.toLowerCase().replace(/\s+/g, '-');
    await this.page.locator(`[data-test="add-to-cart-sauce-labs-${formattedName}"]`).click();
  }

  // Adds multiple products to cart.
  async addItemsToCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.addItemToCart(productName);
    }
  }

  // Verifies cart badge count.
  async assertCartBadgeCount(expectedCount: string): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount);
  }

  // Opens the cart page.
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  // Starts checkout from cart page.
  async startCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
