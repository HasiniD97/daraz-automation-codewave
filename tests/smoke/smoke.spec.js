const { test, expect } = require('../fixtures/base.fixtures');
const { SELECTORS } = require('../../common/constants');
const { DARAZ_URL_PATTERN } = require('../../common/site');

/**
 * High-priority (P0) smoke suite — fast signal on critical user journeys.
 * Run: npx playwright test tests/smoke
 */
test.describe('@smoke High Priority', () => {
  test('HP-01: Homepage loads with correct title and URL', async ({ page, darazHome, homePage }) => {
    await homePage.expectHomepageLoaded();
    await expect(page).toHaveURL(DARAZ_URL_PATTERN);
  });

  test('HP-02: Header shows search, login, cart, and language controls', async ({ page, darazHome }) => {
    const softExpect = expect.configure({ soft: true });
    await softExpect(page.getByPlaceholder(SELECTORS.searchInput)).toBeVisible();
    await softExpect(page.locator(SELECTORS.loginTrigger)).toBeVisible();
    await softExpect(page.locator(SELECTORS.languageSwitch)).toBeVisible();
    await softExpect(page.locator(SELECTORS.cartBadge)).toBeVisible();
  });

  test('HP-03: Product search by keyword returns results', async ({
    darazHome,
    searchBar,
    productsPage,
    productPhones,
  }) => {
    await searchBar.search(productPhones.search_key);
    await productsPage.expectSearchedProductVisibility(productPhones.search_key);
  });

  test('HP-04: Invalid login shows error and keeps guest session', async ({
    darazHome,
    loginPage,
    invalidUser,
    page,
  }) => {
    await loginPage.login(invalidUser.email, invalidUser.password);
    await expect(page.getByText('Invalid account or password.')).toBeVisible();
    await expect(page.locator(SELECTORS.loginTrigger)).toBeVisible();
  });

  test('HP-05: Product detail page exposes Add to Cart and Buy Now', async ({
    darazHome,
    searchBar,
    singleProductPage,
    productPhones,
    page,
  }) => {
    await searchBar.search(productPhones.search_key);
    await singleProductPage.gotoFirstSearchedProduct();
    await expect(page).toHaveURL(/\/products\//i);
    await singleProductPage.expectAddToCartButtonVisibility();
    await singleProductPage.expectBuyNowButtonVisibility();
  });
});
