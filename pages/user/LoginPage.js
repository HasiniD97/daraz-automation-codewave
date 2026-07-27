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
}

module.exports = { LoginPage }