import { defineConfig, devices } from '@playwright/test';
import path from 'path';

export default defineConfig({
  // ─── Test Discovery ────────────────────────────────────────────────────────
  testDir: './tests',
  testMatch: '**/*.spec.js',
  testIgnore: ['**/node_modules/**', '**/fixtures/**'],   // ✅ ADDED: exclude non-test files
  snapshotDir: './snapshots',                             // ✅ ADDED: visual snapshot storage
  snapshotPathTemplate:                                   // ✅ ADDED: consistent snapshot naming
    '{snapshotDir}/{testFilePath}/{arg}{ext}',

  // ─── Timeouts ──────────────────────────────────────────────────────────────
  timeout: 30000,
  expect: { timeout: 5000 },
  globalTimeout: 10 * 60 * 1000,                         // ✅ ADDED: 10-min cap for entire suite

  // ─── Parallelism & Reliability ─────────────────────────────────────────────
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  maxFailures: process.env.CI ? 10 : 0,                  // ✅ ADDED: abort after N failures in CI

  // ─── Reporting ─────────────────────────────────────────────────────────────
  outputDir: './test-results',                           // ✅ ADDED: artifacts (screenshots/videos)
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
    ['junit', { outputFile: 'results/junit.xml' }],
    ['json',  { outputFile: 'results/results.json' }],
    ['list'],
    // ✅ ADDED: dot reporter for compact CI output (conditional)
    ...(process.env.CI ? [['dot']] : []),
    ['allure-playwright', { outputFolder: 'allure-results', detail: true }]
  ],

  // ─── Global Setup / Teardown ───────────────────────────────────────────────
  globalSetup:    './global-setup.js',                   // ✅ ADDED: runs once before all tests
  globalTeardown: './global-teardown.js',               // ✅ ADDED: runs once after all tests

  // ─── Shared Browser Options ────────────────────────────────────────────────
  use: {
    baseURL: process.env.BASE_URL || 'https://myapp.com', // ✅ IMPROVED: env-var override
    headless: true,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
    actionTimeout:     10000,
    navigationTimeout: 30000,

    // ✅ ADDED: reuse signed-in state from auth setup project
    storageState: 'playwright/.auth/user.json',

    // ✅ ADDED: Locale & timezone for date-sensitive tests
    locale:   'en-US',
    timezoneId: 'America/New_York',

    // ✅ ADDED: Permissions (geolocation, notifications, clipboard, etc.)
    permissions: ['geolocation', 'clipboard-read', 'clipboard-write'],
    geolocation: { longitude: -73.9857, latitude: 40.7484 },

    // ✅ ADDED: Color scheme & reduced-motion for accessibility tests
    colorScheme: 'light',          // 'light' | 'dark' | 'no-preference'
    reducedMotion: 'no-preference',

    // ✅ ADDED: Emulate slow network / CPU (useful for perf regression tests)
    // launchOptions: { slowMo: 100 },  // uncomment to slow every action by 100ms

    // ✅ ADDED: Bypass Content Security Policy (needed for injecting test scripts)
    bypassCSP: false,

    // ✅ ADDED: Offline mode toggle
    offline: false,

    // ✅ ADDED: Accept downloads and set download directory
    acceptDownloads: true,
    downloadsPath: path.resolve('./downloads'),

    // ✅ ADDED: HAR recording for network capture / mocking
    recordHar: {
      path: './hars/recording.har',
      mode: 'minimal',             // 'full' | 'minimal'
      urlFilter: /myapp\.com/,
    },

    extraHTTPHeaders: {
      'X-Test-Env': 'playwright',
    },

    // ✅ ADDED: HTTP credentials for Basic Auth protected staging environments
    httpCredentials: {
      username: process.env.HTTP_USER || '',
      password: process.env.HTTP_PASS || '',
    },

    // ✅ ADDED: Proxy settings (useful when tests run behind a corporate proxy)
    // proxy: { server: 'http://proxy.example.com:8080' },

    // ✅ ADDED: Client certificates for mTLS environments
    // clientCertificates: [{ url: 'https://myapp.com', certPath: './cert.pem', keyPath: './key.pem' }],
  },

  // ─── Projects ──────────────────────────────────────────────────────────────
  projects: [
    // Auth setup – runs once, saves storage state
    {
      name: 'setup',
      testMatch: /auth.setup.js/,
      teardown: 'cleanup',         // ✅ ADDED: link to cleanup project
    },

    // ✅ ADDED: Cleanup project (delete test data, revoke tokens, etc.)
    {
      name: 'cleanup',
      testMatch: /global.teardown.spec.js/,
    },

    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup'],     // ✅ IMPROVED: added missing dependency
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      dependencies: ['setup'],     // ✅ IMPROVED: added missing dependency
    },

    // Mobile browsers
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },

    // ✅ ADDED: API-only project (no browser overhead for pure API tests)
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.js',
      use: { browserName: 'chromium' },
    },

    // ✅ ADDED: Accessibility project (runs axe-core checks)
    {
      name: 'a11y',
      testMatch: '**/a11y/**/*.spec.js',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup'],
    },

    // ✅ ADDED: Visual regression project
    {
      name: 'visual',
      testMatch: '**/visual/**/*.spec.js',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1440, height: 900 },
      },
      dependencies: ['setup'],
    },
  ],

  // ─── Web Server (optional) ─────────────────────────────────────────────────
  // ✅ ADDED: Auto-start your dev server before tests; skip if already running
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
    env: { NODE_ENV: 'test' },
  },
});