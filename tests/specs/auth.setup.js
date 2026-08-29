const { test: setup } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const { getValidUser } = require('../../util/testData');

const AUTH_FILE = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // 1. Open Home & Log in
    await homePage.open();
    const validUser = getValidUser();
    await loginPage.login(validUser.email, validUser.password);

    // 2. Save session state to user.json
    await page.context().storageState({ path: AUTH_FILE });
});