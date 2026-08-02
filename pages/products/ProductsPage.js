const { expect } = require('@playwright/test');
const { SELECTORS } = require('../../common/constants');
const { SearchBar } = require('../../pages/common/SearchBar');


class ProductsPage extends SearchBar {

    constructor(page) {
        super(page);
        this.minPriceInput = page.getByPlaceholder('Min');
        this.maxPriceInput = page.getByPlaceholder('Max');
        this.priceFilterButton = page.locator('button:has([data-icon="caret-right"])');
        this.filterDetail = page.locator(SELECTORS.filterDetail);
        this.body = page.locator('body');
        this.brandCheckbox = page.locator(SELECTORS.brandCheckbox);
        this.productCard = page.locator(SELECTORS.productCard);

    }

    async expectSearchedProductVisibility(keyword) {
        await expect(this.body).toContainText(`items found for "${keyword}"`, { ignoreCase: true });
    }


    async filterProductPriceRange(minPrice, maxPrice) {
        await this.minPriceInput.fill(minPrice);
        await this.maxPriceInput.fill(maxPrice);
        await this.priceFilterButton.click();
        await expect(this.filterDetail).toContainText(`${minPrice}-${maxPrice}`);
    }

    async filterProductBrand(brandName) {
        const brandItem = this.brandCheckbox.filter({ hasText: new RegExp(`^${brandName}$`, 'i') }).first();
        await brandItem.click();
        await expect(this.filterDetail).toContainText(brandName);
    }

    async displayProductListingItems(keyword) {
        await expect(this.productCard.first()).toBeVisible();
        await expect(this.productCard).not.toHaveCount(0);
        await expect(this.productCard.first()).toContainText(keyword, { ignoreCase: true });
    }

    async displayInvalidProductSearch(keyword) {
        await expect(this.productCard).toHaveCount(0);
        await expect(this.body).toContainText(`0 items found for "${keyword}"`, { ignoreCase: true });
    }

}

module.exports = { ProductsPage }
