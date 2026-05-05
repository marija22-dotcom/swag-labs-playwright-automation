import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * read environment variables from .env file.
 * without this, process.env.SAUCE_USER will always be undefined locally.
 */
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    /* set baseURL to avoid about:blank */
    baseURL: 'https://www.saucedemo.com',

/* set timeout for actions and navigation */
    actionTimeout: 10_000,       
    navigationTimeout: 15_000,  

    /* helps with debugging locally */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        /* set headless: true if running on CI, false if running locally */
        headless: !!process.env.CI 
      },
    }
  ],
});