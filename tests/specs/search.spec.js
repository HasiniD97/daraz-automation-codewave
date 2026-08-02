const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { ProductsPage } = require('../../pages/products/ProductsPage');
const productList = require('../../data/products.json');
const { SELECTORS } = require('../../common/constants');


test.describe('Search', () => {
    let homePage;
    let searchBar
    let productsPage;

    const phone = productList.phones;
    const tablet = productList.tablets;
    const camera = productList.cameras;
    const invalidProduct = productList.invalid_product;


    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        searchBar = new SearchBar(page);
        productsPage = new ProductsPage(page);
        await homePage.open();
    });


    test('TC-03: Verify Product search by keyword', async ({ page }) => {
        await searchBar.search(phone.search_key);
        await productsPage.expectSearchedProductVisibility(phone.search_key);
    });

    test('TC-04: Verify Search auto-suggestion visibility', async ({ page }) => {
        const suggest = productList.suggest;
        await searchBar.searchSuggest(suggest.search_key);
    });

    test(' TC-05: Verify Price range filter (Min/Max)', async ({ page }) => {
        await searchBar.search(phone.search_key);
        await productsPage.filterProductPriceRange(phone.min_price, phone.max_price);
    });

    test('TC-06: Verify Brand filter on search results', async ({ page }) => {
        await searchBar.search(tablet.search_key);
        await productsPage.filterProductBrand(tablet.brand);
    });

    test('TC-18: Verify Search URL contains query parameter ', async ({ page }) => {
        await searchBar.search(phone.search_key);
        await expect(page).toHaveURL(new RegExp(`q=${phone.search_key}`, 'i'));
    });

    test('TC-19: Verify Search results display product listing items', async ({ page }) => {
        await searchBar.search(camera.search_key);
        await productsPage.displayProductListingItems(camera.search_key);
    });

    test('TC-20: Verify Invalid search shows zero results ', async ({ page }) => {
        await searchBar.search(invalidProduct.search_key);
        await productsPage.displayInvalidProductSearch(invalidProduct.search_key);
    });

    test('TC-21: Verify Suggestion list includes typed keyword', async ({ page }) => {
        await searchBar.searchSuggest(phone.search_key);
        await searchBar.expectSuggestedKeywordVisibility(phone.search_key);
    });


    test('TC-22: Verify Run consecutive searches with different keywords', async ({ page }) => {
        //search tablet
        await searchBar.search(tablet.search_key);
        await productsPage.expectSearchedProductVisibility(tablet.search_key);
        //search phone
        await searchBar.search(phone.search_key);
        await productsPage.expectSearchedProductVisibility(phone.search_key);
        //search camera
        await searchBar.search(camera.search_key);
        await productsPage.expectSearchedProductVisibility(camera.search_key);
    });


});


