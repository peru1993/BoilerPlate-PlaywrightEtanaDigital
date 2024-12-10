const { test, expect } = require('@playwright/test');
import { baseURL } from '../config.js'
const data = require('../data/users.json');
const { LoginPage } = require('../pages/loginPage.js');


test.describe('Login Test Functionality', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open(baseURL);
    });

    test('Verify the systems response when attempting to log in without entering credentials.', async () => {

        await test.step(`Click on the "Login" button.`, async () => {
            const alertText = await loginPage.withoutLoginCredentials();
            await expect(alertText).toBe(data.emptyalert);
        })
    });

    test('Verify the systems response when attempting to log in with only the email details entered.', async () => {

        await test.step(`Enter the email address in the appropriate field and click on the Login button.`, async () => {
            const passwordalert = await loginPage.enterEmail(data.Adminlogin.username);
            await expect(passwordalert).toBe(data.emptypasswordAlert);
        })
        
    });

    test('Verify the systems response when attempting to log in with only the password details entered.', async () => {

        await test.step(`Enter the email address in the appropriate field and click on the Login button.`, async () => {
            const emailalert = await loginPage.enterPassword(data.Adminlogin.password);
            await expect(emailalert).toBe(data.emptyemailAlert);
        })

    });

    test('Verify the systems response when attempting to log in with invalid credentials.', async () => {

        await test.step(`Verify the system's response when attempting to log in with invalid credentials.`, async () => {
            const invalidalert = await loginPage.invalidLogin(data.InvalidAdminlogin.username, data.InvalidAdminlogin.password);
            await expect(invalidalert).toBe(data.invalidAlert);
        })

    });

    test('Verify successful login to the Etana Digital Application with Valid Credentials.', async () => {
        
        await test.step(`Verify successful login to the Etana Digital  Application with Valid Crendital`, async () => {
            const adminText = await loginPage.validLogin(data.Adminlogin.username, data.Adminlogin.password);
            await expect(adminText).toBe(data.adminText);
        })

        
    });

});