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
        await this.click(locators.loginButton);
        await this.verifyElement(locators.alertEmptyLocator, "Please enter your email and password.");
    }

    async enterEmail(username) {
        await this.fill(locators.usernameInput, username);
        await this.click(locators.loginButton);
        await this.verifyElement(locators.alertPasswordLocator, "Please enter your password.");
    }

    async enterPassword(password) {
        await this.fill(locators.userPasswordInput, password);
        await this.click(locators.loginButton);
        await this.verifyElement(locators.alertEmailLocator, "Please enter your email.");
    }

    async invalidLogin(username, password) {
        await this.fill(locators.usernameInput, username);
        await this.fill(locators.userPasswordInput, password);
        await this.click(locators.loginButton);
        await this.verifyElement(locators.incorrectAlertLocator, "Incorrect username or password.");
    }

    async validLogin(username, password) {
        await this.fill(locators.usernameInput, username);
        await this.fill(locators.userPasswordInput, password);
        await this.click(locators.loginButton);
        await this.verifyElement(locators.adminTextLocator, "ADMIN");
    }
}

module.exports = { LoginPage, locators };
