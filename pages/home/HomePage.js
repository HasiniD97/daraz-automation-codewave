const { expect } = require('@playwright/test');
const {BasePage}= require('../../pages/BasePage');
const { SELECTORS } = require('../../common/constants');

class HomePage extends BasePage{

    constructor(page){
    super(page);
    this.loginTrigger = page.locator(SELECTORS.loginTrigger);
    }

    async open(){
        await this.goto('/');
        await this.waitForPageReady(); 
    }

    async expectationHomepageLanded(){
        await expect(this.page).toHaveURL(/daraz\.lk/);
        await expect(this.page).toHaveTitle(/Daraz/i);
    }

}

module.exports ={HomePage}