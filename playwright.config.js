
const { defineConfig, devices, chromium } = require('@playwright/test');


module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 60000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
        headless: false,
        trace: 'off',
        screenshot: 'off',
        video: "off",
        actionTimeout: 60000,
        viewport: null,
        deviceScaleFactor: undefined,
        launchOptions:{args: ['--start-maximized']}
      },

    },
  ]
});

