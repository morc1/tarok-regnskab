const { defineConfig } = require('@playwright/test');
const path = require('path');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1400, height: 1100 },
  },
  webServer: {
    command: 'python3 -m http.server 4173',
    cwd: path.resolve(__dirname),
    port: 4173,
    reuseExistingServer: true,
    timeout: 10000,
  },
});
