const { expect } = require('@playwright/test');

// Exported locators
const locators = {
	adminTextLocator: "//div[text()='ADMIN']",
	investorTextLocator: "//div[text()='INVESTOR']",
	etanatrustTextLocator: "//h1[text()='ETANATRUST']",
	dashboardTextLocator: "//span[text()='DASHBOARD']",
	sideMenuOptions: "//span[contains(@class,'ml-5 transition-all')]",
	userNameLocator: "//div[text()='Gobinath Test']",
	currentyLocator: "//span[contains(@class,'text-gray-300 text-left')]/following-sibling::span",
	datetimeLocator: "//p[@class='text-xs text-gray-400'])[1]",
	notificationLocator: "//div[@class='hover:text-teal-400 text-right']//div[1]",
	notificationstatus: "//p[contains(text(), 'ETH')]",
};


class HomePage {
    constructor(page) {
        this.page = page;
    }

    async clickOtherMenuItem() {
        await this.otherMenuItems.first().click(); // Click any other menu item
      }

    async withoutLoginCredentials() {
        await this.page.click(locators.loginButton);
        const alertMessage = this.page.locator(locators.alertEmptyLocator);
        await expect(alertMessage).toBeVisible();
        await expect(alertMessage).toHaveText("Please enter your email and password.");
    }

    async enterEmail(username) {
        await this.page.fill(locators.usernameInput, username);
        await this.page.click(locators.loginButton);
        const alertPassword = this.page.locator(locators.alertPasswordLocator);
        await expect(alertPassword).toBeVisible();
        await expect(alertPassword).toHaveText("Please enter your password.");
    }

    async enterPassword(password) {
        await this.page.fill(locators.userPasswordInput, password);
        await this.page.click(locators.loginButton);
        const alertEmail = this.page.locator(locators.alertEmailLocator);
        await expect(alertEmail).toBeVisible();
        await expect(alertEmail).toHaveText("Please enter your email.");
    }

    async invalidLogin(username, password) {
        await this.page.fill(locators.usernameInput, username);
        await this.page.fill(locators.userPasswordInput, password);
        await this.page.click(locators.loginButton);
        const incorrectAlert = this.page.locator(locators.incorrectAlertLocator);
        await expect(incorrectAlert).toBeVisible();
        await expect(incorrectAlert).toHaveText("Incorrect username or password.");
    }

    async validLogin(username, password) {
        await this.page.fill(locators.usernameInput, username);
        await this.page.fill(locators.userPasswordInput, password);
        await this.page.click(locators.loginButton);
        const adminText = this.page.locator(locators.adminTextLocator);
        await expect(adminText).toBeVisible();
        await expect(adminText).toHaveText("ADMIN");
    }
}

module.exports = { HomePage, locators };