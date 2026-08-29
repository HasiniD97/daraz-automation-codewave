// @ts-check
const { defineConfig, devices } = require('@playwright/test');
const { loadEnvFile } = require('./util/helper');
const { getDarazBaseUrl } = require('./common/site');

const envName = process.env.TEST_ENV || 'qa';
loadEnvFile(envName);

const baseURL = getDarazBaseUrl();
const AUTH_FILE = 'playwright/.auth/user.json';

/** @type {import('@playwright/test').PlaywrightTestConfig['use']} */
const sharedUse = {
  baseURL,
  locale: 'en-US',
  timezoneId: 'Asia/Colombo',
  viewport: null,
  launchOptions: {
    args: ['--start-maximized'],
  },
  trace: 'retain-on-failure',
  screenshot: 'on',
  video: 'retain-on-failure',
};

const ignoredTests = [/auth\.setup\.js/, /cart\.spec\.js/, /smoke\//];

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 2 : undefined,
  timeout: 60000,
  reporter: [['html'], ['list']],
  grep: process.env.GREP ? new RegExp(process.env.GREP) : undefined,
  use: sharedUse,
  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'chromium',
      testIgnore: ignoredTests,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke-chromium',
      testMatch: /smoke\/.*\.spec\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium-cart',
      testMatch: /cart\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: AUTH_FILE,
      },
    },
    // {
    //   name: 'firefox',
    //   testIgnore: ignoredTests,
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   testIgnore: ignoredTests,
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});

