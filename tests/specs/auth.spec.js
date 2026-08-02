const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const user = require('../../data/user.json');
const { SELECTORS } = require('../../common/constants');

test.describe('Authentication', () => {
    let homePage;
    let loginPage;
    const validUser = user.valid;
    const invalidUser = user.invalid;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        await homePage.open();
    });

    test(' TC-14: Verify Login modal shows email and password fields', async ({ page }) => {
        await loginPage.expectEmailAndPasswordFields();
    });

    test('TC-15: Verify Invalid credentials do not log user in', async ({ page }) => {
        await loginPage.login(invalidUser.email, invalidUser.password);
        await expect(page.getByText('Invalid account or password.')).toBeVisible();
    });

    test('TC-16: Verify Logout returns user to guest state', async ({ page }) => {
        await loginPage.login(validUser.email, validUser.password);
        await loginPage.logout();
        await expect(page.locator(SELECTORS.loginTrigger)).toBeVisible();
    });

});


