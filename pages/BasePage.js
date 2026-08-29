const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../common/constants');
const { logInfo } = require('../util/loggers');

class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path, { waitUntil: 'load', timeout: TIMEOUTS.navigation });
  }

  async waitForPageReady(options = {}) {
    const timeout = options.timeout ?? TIMEOUTS.navigation;
    await this.page.waitForLoadState('load', { timeout });
  }

  async expectVisible(locator, options = {}) {
    await expect(locator).toBeVisible({ timeout: TIMEOUTS.default, ...options });
  }

  async closePopup() {
    try {
      const closeBtn = this.page.locator('.popup-close, .close-btn').first();
      
      if (await closeBtn.isVisible({ timeout: 5000 })) {
        await closeBtn.click();
        logInfo('Popup dismissed');
      } else {
        logInfo('No popup to dismiss');
      }
    } catch (error) {
      logInfo(`No popup to dismiss (${error.message})`);
    }
  }

}

module.exports = { BasePage };

