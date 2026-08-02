const { test: setup } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const user = require('../../data/user.json');

const AUTH_FILE = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // 1. Open Home & Log in
    await homePage.open();
    await loginPage.login(user.valid.email, user.valid.password);

    // 2. Save session state to user.json
    await page.context().storageState({ path: AUTH_FILE });
});