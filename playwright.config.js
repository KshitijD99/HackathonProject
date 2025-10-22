// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  // forbidOnly: !!process.env.CI,
  retries: 1,
  timeout:120000,
  workers: 1,
  reporter: [['html'],['allure-playwright']],
  expect:{
    timeout:120000
  },

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'] ,
        headless:false
      },
    },

    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari'] ,
    //     headless:false
    //   },
    // },
  ],
});

