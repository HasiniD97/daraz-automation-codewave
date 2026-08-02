const { test, expect } = require('@playwright/test');
const { HomePage } = require('../../pages/home/HomePage');
const { LoginPage } = require('../../pages/user/LoginPage');
const { SingleProductPage } = require('../../pages/products/SingleProductPage');
const { SearchBar } = require('../../pages/common/SearchBar');
const { CartPage } = require('../../pages/user/CartPage');
const productList = require('../../data/products.json');
const { SELECTORS } = require('../../common/constants');



test.describe('Cart', () => {

    test.describe.configure({ mode: 'serial', timeout: 60000 });

    let homePage;
    let loginPage;
    let singleProductPage;
    let searchBar;
    let cartPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        singleProductPage = new SingleProductPage(page);
        searchBar = new SearchBar(page);
        cartPage = new CartPage(page);

        await homePage.open();
        await expect(loginPage.accountTrigger).toBeVisible();
    });


    test('TC-07: Verify Add to cart and badge update', async ({ page }) => {
        const camera = productList.cameras;

        //initial cart count
        const beforeCount = await cartPage.getCartCount();

        await searchBar.search(camera.search_key);
        await singleProductPage.gotoFirstSearchedProduct();
        await singleProductPage.addToCart();

        //verify product added to cart
        await cartPage.expectAddToCartSuccessMessage();
        await cartPage.closeSuccessMessageDialog();

        //verify cart badge update
        const expectedCount = beforeCount + 1;
        await cartPage.expectCartBadgeCount(expectedCount);
    });


    test(' TC-08: Verify Cart persistence after reload', async ({ page }) => {
        const beforeCount = await cartPage.getCartCount();
        await page.reload();
        await page.waitForLoadState('load');
        await cartPage.expectCartBadgeCount(beforeCount);
    });


    test('TC-09: Verify Remove item and badge update', async ({ page }) => {
        const tablet = productList.tablets;

        await searchBar.search(tablet.search_key);
        await singleProductPage.gotoFirstSearchedProduct();
        await singleProductPage.addToCart();

        //verify product added to cart
        await cartPage.expectAddToCartSuccessMessage();
        await cartPage.closeSuccessMessageDialog();
        
        await homePage.gotoCart();
        // Wait for Daraz cart backend sync to complete
        await page.waitForLoadState('networkidle');


        //initial cart count
        const beforeRemoveCount = await cartPage.getCartCount();

        await cartPage.removeFirstCartProduct();

        //verify cart badge update
        const expectedCount = beforeRemoveCount - 1;
        await cartPage.expectCartBadgeCount(expectedCount);
        
    });
    

    test('TC-26: Verify Cart badge increases after adding another product', async ({ page }) => {
        const tablet = productList.tablets;
        const camera = productList.cameras;

        await searchBar.search(tablet.search_key);
        await singleProductPage.gotoFirstSearchedProduct();
        await singleProductPage.addToCart();

        //verify product added to cart
        await cartPage.expectAddToCartSuccessMessage();
        await cartPage.closeSuccessMessageDialog();

        //initial cart count
        const beforeNextItemAddCount = await cartPage.getCartCount();

        await homePage.expectDarazLogoNavigationToHomepage();

        await searchBar.search(camera.search_key);
        await singleProductPage.gotoFirstSearchedProduct();
        await singleProductPage.addToCart();

        await cartPage.expectAddToCartSuccessMessage();
        await cartPage.closeSuccessMessageDialog();

        //verify cart badge update
        const expectedCount = beforeNextItemAddCount + 1;
        await cartPage.expectCartBadgeCount(expectedCount);
    });

});
