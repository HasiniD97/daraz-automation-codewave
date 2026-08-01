const { expect } = require('@playwright/test');
const { BasePage } = require('../../pages/BasePage');

const { SELECTORS } = require('../../common/constants');

class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.loginTrigger = page.locator(SELECTORS.loginTrigger);
        this.cartCount = page.locator(SELECTORS.cartCount);
        this.darazLogo = page.locator(SELECTORS.darazLogo);
    }

    async open() {
        await this.goto('/');
        await this.waitForPageReady();
    }

    async expectHomepageLoaded() {
        await expect(this.page).toHaveURL(/daraz\.lk/);
        await expect(this.page).toHaveTitle(/Daraz/i);
    }

    async expectEmptyCart() {
        await expect(this.cartCount).toBeHidden();
    }

    async expectDarazLogoNavigationToHomepage() {
        await this.darazLogo.click();
        await this.waitForPageReady();
    }

}

module.exports = { HomePage }