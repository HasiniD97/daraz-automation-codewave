const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { ProductsPage } = require('../../pages/products/ProductsPage');
const { SELECTORS } = require('../../common/constants');
const productList = require('../../data/products.json');

test.describe('Homepage', () => {
    let homePage;
    let searchBar;
    let productsPage;
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
        productsPage = new ProductsPage(page);

        await searchBar.search(headphone.search_key);
        await productsPage.expectSearchedProductVisibility(headphone.search_key)
        await homePage.expectDarazLogoNavigationToHomepage();
        await expect(page.locator(SELECTORS.flashSaleText).getByText(/Flash Sale/i)).toBeVisible();
    });



});


