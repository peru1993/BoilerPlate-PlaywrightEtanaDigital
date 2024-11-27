const { test, expect } = require('@playwright/test');
const config = require('../data/config.json');
const { LoginPage } = require('../pages/loginPage.js'); 


test.describe('Login Test Functionality', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate(config.baseUrl); 
    });

    test('Verify the systems response when attempting to log in without entering credentials.', async () => {
        await loginPage.withoutLoginCredentials();
    });

    test('Verify the systems response when attempting to log in with only the email details entered.', async () => {
        await loginPage.enterEmail(config.Adminlogin.username);
    });

    test('Verify the systems response when attempting to log in with only the password details entered.', async () => {
        await loginPage.enterPassword(config.Adminlogin.password);
    });

    test('Verify the systems response when attempting to log in with invalid credentials.', async () => {
        await loginPage.invalidLogin(config.InvalidAdminlogin.username, config.InvalidAdminlogin.password);
    });

    test('Verify successful login to the Etana Digital Application with Valid Credentials.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
    });
});
