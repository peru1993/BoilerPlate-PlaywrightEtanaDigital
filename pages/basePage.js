const { expect } = require('@playwright/test');

class BasePage {
    constructor(page) {
        this.page = page;
    }

    // Navigate to a URL
    async navigate(url) {
        await this.page.goto(url);
    }

    // Click on an element
    async click(locator) {
        await this.page.click(locator);
    }

    // Fill an input field
    async fill(locator, text) {
        await this.page.fill(locator, text);
    }

    // Verify if an element is visible
    async verifyElement(locator, expectedText = '') {
        const element = this.page.locator(locator);
        await expect(element).toBeVisible();
        if (expectedText) {
            await expect(element).toHaveText(expectedText);
        }
    }
}

module.exports = { BasePage };
