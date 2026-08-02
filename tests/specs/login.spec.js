const { test, expect } = require('@playwright/test');

const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const { SettingPage } = require('../../pages/user/SettingPage');

const user = require('../../data/user.json');

test.describe('Login & Language', () => {
  let homePage;
  let loginPage;
  let settingPage;
  const userData = user.valid;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    settingPage = new SettingPage(page);
    await homePage.open();
  });


  test('TC-01: Verify Successful login with valid credentials', async ({page}) => {
    await loginPage.login(userData.email, userData.password);
    await expect(loginPage.accountTrigger).toHaveText(new RegExp(userData.displayName, 'i'));
  });


  test('TC-02 : Verify Multi-language UI (English/Sinhala)', async ({ page }) => {
    await loginPage.login(userData.email, userData.password);
    await settingPage.switchLanguage(userData.language);
    await expect(page.getByText(/Help & Support/i)).toBeVisible();
    await expect(page.getByText('භාෂාව තෝරන්න')).toBeVisible();
  });


  test('TC-17: Verify Switch language to Sinhala and back to English', async ({ page }) => {
    await settingPage.switchLanguage('si');
    await expect(page.getByText(/change language/i)).toBeVisible();
    await settingPage.switchLanguage('en');
    await expect(page.getByText(/භාෂාව තෝරන්න/)).toBeVisible();
  });

});

