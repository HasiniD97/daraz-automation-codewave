const { expect } = require('@playwright/test');
const { SELECTORS, TIMEOUTS } = require('../../common/constants');

class SearchBar {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByRole('searchbox', { name: SELECTORS.searchInput });
        this.searchSuggestList = page.locator(SELECTORS.searchSuggestList);
    }

    async search(keyword) {
        await this.searchInput.fill(keyword);
        await this.searchInput.press('Enter');
        // await this.page.waitForLoadState('load');
    }

    async searchSuggest(keyword) {
        await this.searchInput.click();
        await this.searchInput.pressSequentially(keyword,{ delay: 100 });
        await this.searchSuggestList.waitFor({ state: 'visible', timeout: 10000 });
    }

        async expectSuggestedKeywordVisibility(keyword) {
        await expect(this.searchSuggestList.getByText(new RegExp(keyword, 'i')).first()).toBeVisible();
    }



}

module.exports = { SearchBar }