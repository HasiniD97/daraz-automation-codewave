const { expect } = require('@playwright/test');
const { SELECTORS } = require('../../common/constants');

class CartPage {
    constructor(page) {

        this.page = page;
        this.cartMessageTrigger = page.locator('.cart-message');
        this.cartMessageClose = page.locator('.next-dialog-close');
        this.cartItem = page.locator('.cart-item-left');
        // this.cartItemCheckbox = page.locator('input[type="checkbox"]');
        this.cartItemDeleteTrigger = page.locator('.lazada.lazada-ic-Delete.lazada-icon.icon.delete');
        this.cartItemDeleteAlert = page.getByRole('alertdialog', { name: 'Remove from cart' });
        this.cartItemDeleteButton = page.getByRole('button', { name: 'REMOVE' });
        this.cartCount = page.locator(SELECTORS.cartCount);
    }
    

    //visible message when product added to cart
    async expectAddToCartMessageVisibility() {
        await expect(this.cartMessageTrigger).toBeVisible();
    }

    async expectAddToCartSuccessMessage() {
        await expect(this.cartMessageTrigger).toContainText(/Added to cart successfully/i);
    }

    async closeSuccessMessageDialog() {
        await this.cartMessageClose.click();
    }


    async getCartCount() {
        if (await this.cartCount.isVisible()) {
            const text = await this.cartCount.textContent();
            return Number(text?.trim()) || 0;
        }
        return 0;
    }

    async expectCartBadgeCount(expectedCount) {
        await expect(this.cartCount).toHaveText(expectedCount.toString());
    }

     async removeFirstCartProduct() { 
        await this.cartItem.first().waitFor({ state: 'visible', timeout: 10000 });
        await this.cartItemDeleteTrigger.first().click();
        await expect(this.cartItemDeleteAlert).toBeVisible();
        await this.cartItemDeleteButton.click();
    }



}

module.exports = { CartPage }