const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { ProductsPage } = require('../../pages/products/ProductsPage');
const { SingleProductPage } = require('../../pages/products/SingleProductPage');
const { CartPage } = require('../../pages/user/CartPage');
const { SettingPage } = require('../../pages/user/SettingPage');
const { getValidUser, getInvalidUser, getProduct } = require('../../util/testData');

const test = base.extend({
  validUser: async ({}, use) => {
    await use(getValidUser());
  },
  invalidUser: async ({}, use) => {
    await use(getInvalidUser());
  },
  productPhones: async ({}, use) => {
    await use(getProduct('phones'));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  searchBar: async ({ page }, use) => {
    await use(new SearchBar(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  singleProductPage: async ({ page }, use) => {
    await use(new SingleProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  settingPage: async ({ page }, use) => {
    await use(new SettingPage(page));
  },
  /** Opens Daraz homepage before each test that uses this fixture. */
  darazHome: async ({ page, homePage }, use) => {
    await homePage.open();
    await use(undefined);
  },
});

module.exports = { test, expect };
