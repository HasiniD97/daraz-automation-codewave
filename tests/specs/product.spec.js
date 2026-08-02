const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SingleProductPage } = require('../../pages/products/SingleProductPage');
const { SearchBar } = require('../../pages/common/SearchBar');

const productList = require('../../data/products.json');
const { SELECTORS } = require('../../common/constants');

test.describe('Product details', () => {
    let homePage;
    let searchBar;
    let singleProductPage;
    const camera = productList.cameras;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchBar = new SearchBar(page);
        singleProductPage = new SingleProductPage(page);

        await homePage.open();
        await searchBar.search(camera.search_key);
        await singleProductPage.gotoFirstSearchedProduct();
    });


    test('TC-23: Verify Product page shows Add to Cart button', async ({ page }) => {
        await singleProductPage.expectAddToCartButtonVisibility();
    });


    test('TC-24: Verify Navigating to product updates URL to `/products/`', async ({ page }) => {
        await expect(page).toHaveURL(/\/products\//i);
    });


       test('TC-25: Verify Product page shows Buy Now button', async ({ page }) => {
        await singleProductPage.expectBuyNowButtonVisibility(); 
    });


});

