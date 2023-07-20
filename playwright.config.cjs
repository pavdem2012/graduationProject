const { defineConfig, devices } = require('@playwright/test');

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
        contextOptions: {
            request: async (route) => {
                if (route.url().includes('/#google_vignette')) {
                    console.log('Blocked request:', route.url());
                    await route.abort();
                } else {
                    await route.continue();
                }
            },
        },
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                contextOptions: this.contextOptions
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                browserName: 'firefox',
                contextOptions: this.contextOptions
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                browserName: 'webkit',
                contextOptions: this.contextOptions
            },
        },
        // ... другие проекты ...
    ],
});
