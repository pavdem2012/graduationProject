const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './src/tests/e2e',
    fullyParallel: false,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 3 : 3,
    reporter: [['html', { outputFolder: 'reports/playwright' }]],
    use: {
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
    },
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                browserName: 'chromium',
                contextOptions: {
                    routes: [
                        {
                            // Перехватываем запросы содержащие /#google_vignette в любом месте урла
                            url: '**/*/#google_vignette*',
                            handler: async (route, request) => {
                                // Блокируем запрос, отправляя пустой ответ с кодом 200
                                await route.fulfill({
                                    status: 200,
                                    body: '',
                                });
                            },
                        },
                    ],
                },
            },
        },
        {
            name: 'firefox',
            use: {
                ...devices['Desktop Firefox'],
                browserName: 'firefox',
                contextOptions: {
                    routes: [
                        {
                            // Перехватываем запросы содержащие /#google_vignette в любом месте урла
                            url: '**/*/#google_vignette*',
                            handler: async (route, request) => {
                                // Блокируем запрос, отправляя пустой ответ с кодом 200
                                await route.fulfill({
                                    status: 200,
                                    body: '',
                                });
                            },
                        },
                    ],
                },
            },
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                browserName: 'webkit',
                contextOptions: {
                    routes: [
                        {
                            // Перехватываем запросы содержащие /#google_vignette в любом месте урла
                            url: '**/*/#google_vignette*',
                            handler: async (route, request) => {
                                // Блокируем запрос, отправляя пустой ответ с кодом 200
                                await route.fulfill({
                                    status: 200,
                                    body: '',
                                });
                            },
                        },
                    ],
                },
            },
        },
        // ... другие проекты ...
    ],
});
