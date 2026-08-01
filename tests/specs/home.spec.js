const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { SELECTORS } = require('../../common/constants');
const productList = require('../../data/products.json');

test.describe('Home Page', () => {
    let homePage;
    let searchBar;
    const product = productList;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        await homePage.open();
    });

    test('TC-10: Verify Homepage loads with correct title and URL', async ({ page }) => {
        await expect(page).toHaveURL(/daraz\.lk/);
        await expect(page).toHaveTitle(/Daraz/i);
    });


    test('TC-11: Verify Key header elements visible (search, login, cart, language)', async ({ page }) => {
        const softExpect = expect.configure({ soft: true });
        await softExpect(page.getByPlaceholder(SELECTORS.searchInput)).toBeVisible();
        await softExpect(page.locator(SELECTORS.loginTrigger)).toBeVisible();
        await softExpect(page.locator(SELECTORS.languageSwitch)).toBeVisible();
        await softExpect(page.locator(SELECTORS.cartBadge)).toBeVisible();
    });


    test('TC-12: Verify Guest cart badge is empty or zero', async ({ page }) => {
        await expect(page.locator(SELECTORS.cartCount)).toBeHidden();
    });

    test('TC-13: Verify Logo navigates back to homepage from catalog ', async ({ page }) => {
        let headphone = product.headphones;
        searchBar = new SearchBar(page);
        await searchBar.search(headphone.search_key);
        await expect(page.locator('body')).toContainText(`items found for "${headphone.search_key}"`, { ignoreCase: true });
        await homePage.expectDarazLogoNavigationToHomepage();
        await expect(page.locator(SELECTORS.flashSaleText).getByText(/Flash Sale/i)).toBeVisible();
    });

});


