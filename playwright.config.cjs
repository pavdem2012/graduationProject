const { defineConfig, devices } = require('@playwright/test');
const { join } = require('path');

module.exports = defineConfig({
  testDir: './src/tests/e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 2,
  workers: process.env.CI ? 3 : undefined,
  reporter: [['html', { outputFolder: 'reports/playwright' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    headless: true,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        context: async ({ launchPersistentContext }) => {
          const pathToExtension = join(__dirname, 'src/framework/extensions/chrome/extension_5_8_0_0.crx');
          return await launchPersistentContext('', {
            headless: false,
            args: [`--load-extension=${pathToExtension}`],
          });
        },
      },
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        context: async ({ launchPersistentContext }) => {
          const pathToExtension = join(__dirname, 'src/framework/extensions/firefox/adblock_for_firefox-5.4.2.xpi');
          return await launchPersistentContext('', {
            headless: true,
            args: [`--load-extension=${pathToExtension}`],
          });
        },
      },
    },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // },
  ],
});

// {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] }
    // },
