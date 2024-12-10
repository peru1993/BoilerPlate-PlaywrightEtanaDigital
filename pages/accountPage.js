const { BasePage } = require('./basePage');
const locators = {

    myAccountTextLocator: "//h1[text()='My Account']",
    editInfoButtonLocator: "//button[contains(.,'Edit Info')]",
    webhookURLiconLocator: "(//span[text()='Webhook URL']/following-sibling::div)[1]",
    webhookURLiconTextLocator:
        "//div[text()='Notifications about transactions can be sent as HTTP requests to a given URL.']",
    webhookKeyiconLocator: "(//span[text()='Webhook Key']/following-sibling::div)[1]",
    webhookKeyiconTextLocator: "//div[text()='Use this 32-byte key to decode webhooks with AES.']",
    apiKeyiconLocator: "(//span[text()='API Key']/following-sibling::div)[1]",
    apiKeyiconTextLocator:
        "//span[(text())='To use the Etana Digital API, include this key as a header in each HTTP request:']",
    webhooKeyShowHideLocator: "(//span[@class='flex space-x-1']//div)[2]",
    webhooKeyFieldValue: "(//div[contains(@class,'flex text-xs')]//span)[1]",
    webapiKeyFieldValue:
        "//span[normalize-space(text())='6c16f4e2b24b092db3ff7055792ee1a878e85c6c097f0a0abb8e657c0a0ae18f']",
    apiKeyShowHideLocator: "(//div[contains(@class,'text-gray-400 hover:text-blue-300')])[2]",
    WebhookKeycopyLocator: "(//span[@class='flex space-x-1']//span)[2]",
    webhookKeyToastLocator: "//div[@role='status' and contains(text(), 'Webhook key copied')]",
    saveChangesButtonLocator: "//button[contains(.,'Save Changes')]",
    cancelButtonLocator: "//button[contains(.,'Cancel')]",
    webhookURLFieldLocator: "//input[@placeholder='Enter your webhook URL']",
    webhookURLEditLocator: "//div[@class='text-gray-300']/following-sibling::div[1]",
    FirstNameLocator: "//div[text()='First Name']/following-sibling::div",
    LastNameLocator: "//div[text()='Last Name']/following-sibling::div"
};

class AccountPage extends BasePage {

    constructor(page) {
        super(page);
    }

    async getAccountdetails(getName) {
        return await this.locateElement(`//div[text()='${getName}']`);
    }
    async getAccountdetail(getName) {
        return await this.locateElement(`//span[text()='${getName}']`);
    }

    async getMyAccountTextElement(){
        return await this.locateElement(locators.myAccountTextLocator);
    }

    async testWebHookURLIconHoverText(){
        const hoverElement = await this.locateElement(locators.webhookURLiconLocator);
        await hoverElement.hover();
        return await this.locateElement(locators.webhookURLiconTextLocator);
    }

    async testWebHookKeyIconHoverText(){
        const hoverElement = await this.locateElement(locators.webhookKeyiconLocator);
        await hoverElement.hover();
        return await this.locateElement(locators.webhookKeyiconTextLocator);
    }

    async testWebAPIKeyIconHoverText(){
        const hoverElement = await this.locateElement(locators.apiKeyiconLocator);
        await hoverElement.hover();
        return await this.locateElement(locators.apiKeyiconTextLocator);
    }

    async getWebhookKeyToastValues(){
        await this.clickElement(locators.WebhookKeycopyLocator);
        return await this.locateElement(locators.webhookKeyToastLocator);
    }

}

module.exports = { AccountPage, locators };