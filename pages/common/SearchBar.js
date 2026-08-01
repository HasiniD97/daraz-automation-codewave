const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');

class SearchBar {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', { name: SELECTORS.searchInput })
    }

    async search(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchInput.press('Enter');
        await this.page.waitForLoadState('load');
    }

}

module.exports = { SearchBar }