const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');

class SingleProductPage {
    constructor(page) {
        this.page = page;
        this.productCard = page.locator(SELECTORS.productCard);
        this.addToCartButton = page.getByRole('button', { name: SELECTORS.addToCartButton, exact: true });
        this.buyNowButton = page.getByRole('button', { name: SELECTORS.buyNowButton, exact: true });
    }

    async gotoFirstSearchedProduct() {
        await expect(this.productCard.first()).toBeVisible();
        await this.productCard.first().click();
    }

    async expectAddToCartButtonVisibility() {
        await expect(this.addToCartButton).toBeVisible();    
    }

    async expectBuyNowButtonVisibility() {
        await expect(this.buyNowButton).toBeVisible();    
    }

}

module.exports = { SingleProductPage }