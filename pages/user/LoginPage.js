const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');

class LoginPage {
    constructor(page) {

        this.page = page;
        this.loginTrigger = page.locator(SELECTORS.loginTrigger);
        this.emailInput = page.locator('input[type="text"]');
        this.passwordInput = page.locator('input[type="password"]');
        this.loginButton = page.getByRole('button', { name: 'LOGIN' });
        this.accountTrigger = page.locator(SELECTORS.accountTrigger);
        this.accountLogout = page.getByRole('link', { name: 'Logout' });
    }

    async openLoginModal() {
        await this.loginTrigger.click();
    }

    async login(email, password) {
        await this.openLoginModal();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectEmailAndPasswordFields() {
        await this.openLoginModal();
        await expect(this.emailInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
    }

    async logout() {
        await this.accountTrigger.click();
        await this.accountLogout.click({force:true});
        // await this.page.waitForLoadState('load');
    }
}

module.exports = { LoginPage }