const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const baseConfigModule = require('./playwright.config');
const baseConfig = baseConfigModule.default || baseConfigModule;

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
module.exports = createAzurePlaywrightConfig(baseConfig, {
  exposeNetwork: '<loopback>',
  connectTimeout: 3 * 60 * 1000, // 3 minutes
  os: ServiceOS.LINUX,
  credential: new DefaultAzureCredential(),
  reporter: [
    ['html', { open: 'never' }],
    ['@azure/playwright/reporter'],
  ],
});
