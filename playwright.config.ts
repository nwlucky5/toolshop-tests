import { defineConfig, devices } from '@playwright/test';
import { BASE_URL } from 'config/env.config';
import * as path from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const STORAGE_STATE = path.join(__dirname, 'tmp/session.json');

export default defineConfig({
  testDir: './tests',
  globalSetup: 'config/global.setup.ts',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: 0,
  workers: undefined,
  reporter: [
    ['html'],
    ['github'],
    ['json', { outputFile: 'results.json' }],
    ['junit', { outputFile: 'results.xml' }],
  ],
  use: {
    baseURL: BASE_URL,
    actionTimeout: 0,
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'api',
      testDir: 'tests/api',
    },
    {
      name: 'chromium-non-logged',
      grepInvert: /@logged/,
      testDir: 'tests/ui',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'setup',
      testMatch: '*.setup.ts',
    },
    {
      name: 'chromium-logged',
      grep: /@logged/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },
  ],
});
