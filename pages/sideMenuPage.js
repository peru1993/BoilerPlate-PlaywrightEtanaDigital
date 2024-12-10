const { BasePage } = require('./basePage');
const locators = {

    sideMenuOpenLocator: "//div[contains(@class,'rounded-full bg-white')]",
    etanaLogo: "//div[contains(@class,'flex overflow-hidden')]//img[2]",
};

class SideMenu extends BasePage {

    constructor(page) {
        super(page);
    }

    // Locator Element Action

    async getEtanaLogo() {
        await this.locateElement(locators.etanaLogo);
    }

    async getmenuName(menuName) {
        return await this.locateElement(`//span[text()='${menuName}']`);
    }

    // click Action

    async clickMenuName(menuName) {
        return await this.clickElement(`//span[text()='${menuName}']`);
    }

    async clickElementMultipleTimes(numberofclicks) {
        for (let i = 0; i < numberofclicks; i++) {
            await this.clickElement(locators.sideMenuOpenLocator);
        }

    }





}

module.exports = { SideMenu, locators };