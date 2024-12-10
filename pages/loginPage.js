const { BasePage } = require('./basePage');
const locators = {
    usernameInput: '//input[@type="email"]',
    userPasswordInput: '//input[@type="password"]',
    loginButton: '//button[@type="submit"]',
    alertEmptyLocator: "//div[text()='Please enter your email and password.']",
    alertPasswordLocator: "//div[text()='Please enter your password.']",
    alertEmailLocator: "//div[text()='Please enter your email.']",
    incorrectAlertLocator: "//div[text()='Incorrect username or password.']",
    adminTextLocator: "//div[text()='ADMIN']",
};

class LoginPage extends BasePage {
    constructor(page) {
        super(page);
    }

    async withoutLoginCredentials() {
        await this.waitAndClick(locators.loginButton);
        return this.getElementText(locators.alertEmptyLocator, 'Alert for Empty Credentials');
    }

    async enterEmail(username) {
        await this.waitAndFill(locators.usernameInput, username);
        await this.waitAndClick(locators.loginButton);
        return this.getElementText(locators.alertPasswordLocator, 'Alert for Empty Password');
    }

    async enterPassword(password) {
        await this.waitAndFill(locators.userPasswordInput, password);
        await this.waitAndClick(locators.loginButton);
        return this.getElementText(locators.alertEmailLocator,'Alert for Empty Email');
    }

    async invalidLogin(username, password) {
        await this.waitAndFill(locators.usernameInput, username);
        await this.waitAndFill(locators.userPasswordInput, password);
        await this.waitAndClick(locators.loginButton);
        return this.getElementText(locators.incorrectAlertLocator,"Invalid Credentials Alert");
    }

    async validLogin(username, password) {
        await this.waitAndFill(locators.usernameInput, username);
        await this.waitAndFill(locators.userPasswordInput, password);
        await this.waitAndClick(locators.loginButton);
        return this.getElementText(locators.adminTextLocator);
    }
}

module.exports = { LoginPage, locators };
