import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  // Stores the Playwright page instance for all base actions.
  constructor(page: Page) {
    this.page = page;
  }

  // ---------- Navigation ----------
  // Opens a URL and waits for the selected load state.
  async goto(url: string, waitUntil: 'domcontentloaded' | 'load' | 'networkidle' = 'load'): Promise<void> {
    await this.page.goto(url, { waitUntil });
  }

  // Reloads the current page and waits for the selected load state.
  async reload(waitUntil: 'domcontentloaded' | 'load' | 'networkidle' = 'load'): Promise<void> {
    await this.page.reload({ waitUntil });
  }

  // Waits until the current URL matches a string or regex pattern.
  async waitForUrl(urlOrRegex: string | RegExp, timeout = 15_000): Promise<void> {
    await expect(this.page).toHaveURL(urlOrRegex, { timeout });
  }

  // ---------- Read / Assertions ----------
  // Returns the current page title.
  async title(): Promise<string> {
    return this.page.title();
  }

  // Reads and trims text content from a selector.
  async text(selector: string): Promise<string> {
    const value = await this.page.locator(selector).textContent();
    return value?.trim() ?? '';
  }

  // Asserts that an element becomes visible within timeout.
  async expectVisible(selector: string, timeout = 10_000): Promise<void> {
    await expect(this.page.locator(selector)).toBeVisible({ timeout });
  }

  // Asserts that an element is hidden within timeout.
  async expectHidden(selector: string, timeout = 10_000): Promise<void> {
    await expect(this.page.locator(selector)).toBeHidden({ timeout });
  }

  // ---------- Interactions ----------
  // Clicks an element located by selector.
  async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  // Fills an input or textarea with a value.
  async fill(selector: string, value: string): Promise<void> {
    await this.page.locator(selector).fill(value);
  }

  // Presses a keyboard key on the target element.
  async press(selector: string, key: string): Promise<void> {
    await this.page.locator(selector).press(key);
  }

  // Clears a field first, then types value keystroke-by-keystroke.
  async clearAndType(selector: string, value: string): Promise<void> {
    const field = this.page.locator(selector);
    await field.click();
    await field.fill('');
    await field.type(value);
  }

  // Checks a checkbox or radio input.
  async check(selector: string): Promise<void> {
    await this.page.locator(selector).check();
  }

  // Unchecks a checkbox input.
  async uncheck(selector: string): Promise<void> {
    await this.page.locator(selector).uncheck();
  }

  // ---------- Waiting ----------
  // Waits for visibility and returns locator for chaining.
  async waitForVisible(selector: string, timeout = 10_000): Promise<Locator> {
    const locator = this.page.locator(selector);
    await expect(locator).toBeVisible({ timeout });
    return locator;
  }

  // Basic app readiness check using page load states and one visible element.
  async waitForAppReadyBasic(selector: string, timeout = 10_000): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded', { timeout });
    await this.page.waitForLoadState('load', { timeout });
    await this.page.waitForLoadState('networkidle', { timeout });
    await this.expectVisible(selector, timeout);
  }

  // Full app readiness check including images, fonts, and running animations.
  async waitForAppReadyFull(selector: string, timeout = 15_000): Promise<void> {
    const { page } = this;

    await page.waitForLoadState('domcontentloaded', { timeout });
    await page.waitForLoadState('load', { timeout });
    await page.waitForLoadState('networkidle', { timeout });

    await page.waitForFunction(() => {
      const docReady = document.readyState === 'complete';
      const imgsLoaded = Array.from(document.images).every(
        (img) => img.complete && img.naturalWidth > 0,
      );

      const fontSet = (document as Document & { fonts?: { status?: string } }).fonts;
      const fontsLoaded = !fontSet || fontSet.status === 'loaded';

      const docWithAnimations = document as Document & {
        getAnimations?: (options?: { subtree?: boolean }) => Array<{ playState: string }>;
      };
      const animations = docWithAnimations.getAnimations?.({ subtree: true }) ?? [];
      const noAnimationsRunning = animations.every((animation) => animation.playState !== 'running');

      return docReady && imgsLoaded && fontsLoaded && noAnimationsRunning;
    }, { timeout });

    await this.expectVisible(selector, timeout);
    await page.waitForTimeout(300);
  }
}
