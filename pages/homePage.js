const { BasePage } = require('./basePage');
const { expect } = require('@playwright/test');

// Exported locators
const locators = {
    adminTextLocator: "//div[text()='ADMIN']",
    investorTextLocator: "//div[text()='INVESTOR']",
    etanatrustTextLocator: "//h1[text()='ETANATRUST']",
    dashboardTextLocator: "//span[text()='DASHBOARD']",
    sideMenuOptions: "//span[contains(@class,'ml-5 transition-all')]",
    userNameLocator: "//div[text()='Gobinath Test']",
    currencyTypeLocator: "//span[contains(@class,'text-gray-300 text-left')]",
    currentyLocator: "//span[contains(@class,'text-gray-300 text-left')]/following-sibling::span",
    datetimeLocator: "//p[@class='text-xs text-gray-400'])[1]",
    notificationLocator: "//div[@class='hover:text-teal-400 text-right']//div[1]",
    alertnotificationLocator: "//div[normalize-space(text())='No notifications']",
    notificationstatus: "//p[contains(text(), 'ETH')]",
};

class HomePage extends BasePage {

    constructor(page) {
        super(page);
    }
    async getAdminTextElement() {
        await this.locateElement(locators.adminTextLocator);
    }
    async getetanaTrustTextElement() {
        await this.locateElement(locators.etanatrustTextLocator);
    }
    async getdashboardTextElement() {
        await this.locateElement(locators.dashboardTextLocator);
    }

    async clickNotificationElement(){
        await this.clickElement(locators.notificationLocator);
        return this.locateElement(locators.alertnotificationLocator);
    }

    async verifySideMenuOrder() {
        await this.page.waitForSelector(locators.sideMenuOptions);
        const menuItems = await this.page.locator(locators.sideMenuOptions).allTextContents();
        return menuItems;
    }

    async verifyCurrencyTypes() {
        await this.page.waitForSelector(locators.currencyTypeLocator);
        const currencyelement = await this.page.locator(locators.currencyTypeLocator).allTextContents();
        return currencyelement;
    }

    async verifyCurrencyValues() {
        await this.page.waitForSelector(locators.currentyLocator);
        const currencyValues = await this.page.locator(locators.currentyLocator).allTextContents();
        console.log("Peru.c", currencyValues);
        const regexPatterns = [
            /^\d+$/,                  // Whole numbers (e.g., 134819944)
            /^-?\d+\.\d{8}$/,         // Decimal numbers with exactly 8 decimal places (e.g., -13.50000007)
            /^-?\d+\.\d+$/,           // Regular decimal numbers (e.g., 41.88963645, 2.025)
            /^-?\d+$/,                // For values like 110, 396.94 (also works with whole numbers)
            /^-?\d+\.\d+$/,           // Matches all forms of floating point numbers with at least one decimal
            /^-?\d+\.\d+e[+-]?\d+$/,  // Scientific notation (e.g., 7.875316567e-05)
        ];

        for (let i = 0; i < currencyValues.length; i++) {
            const value = currencyValues[i].trim();
            const pattern = regexPatterns[i];
            console.log(`Validating: ${value} against ${pattern}`);
            expect(value).toMatch(pattern);
        }
        // for (const value of currencyValues) {
        //     expect(value.trim()).toMatch(regexPatterns);
        // }
    }
}

module.exports = { HomePage, locators };