const { defineConfig, devices } = require('@playwright/test');
const { join } = require('path');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './src/tests/e2e',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 3 : 3,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 3 : 3,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { outputFolder: 'reports/playwright' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    // Capture Screenshot on failure
    screenshot: 'retain-on-failure',
    headless: true,
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      launchOptions: {
        args: [`--load-extension=${join(__dirname, 'src/framework/extensions/chrome/extension_5_8_0_0.crx')}`],
      },
      // Функция для запуска Chromium с расширением
      use: {
        context: async ({ launchPersistentContext }) => {
          const pathToExtension = join(__dirname, 'src/framework/extensions/chrome/extension_5_8_0_0.crx');
          const context = await launchPersistentContext('', {
            headless: false,
            args: [
              `--load-extension=${pathToExtension}`,
            ],
          });
          return context;
        },
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      launchOptions: {
        args: [`--load-extension=${join(__dirname, 'src/framework/extensions/firefox/adblock_for_firefox-5.4.2.xpi')}`],
      },
      // Функция для запуска Firefox с расширением
      use: {
        context: async ({ launchPersistentContext }) => {
          const pathToExtension = join(__dirname, 'src/framework/extensions/firefox/adblock_for_firefox-5.4.2.xpi');
          const context = await launchPersistentContext('', {
            headless: false,
            args: [
              `--load-extension=${pathToExtension}`,
            ],
          });
          return context;
        },
      },
    },
  ],
});
