const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage.js');
const { SideMenu } = require('../pages/sideMenuPage.js');
const { AccountPage } = require('../pages/accountPage.js');
const data = require('../data/users.json');
import { baseURL } from '../config.js'
test.describe('Account Page Functionality', () => {
    let loginPage;
    let sideMenu;
    let accountPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        sideMenu = new SideMenu(page);
        accountPage = new AccountPage(page);
        await loginPage.navigate(baseURL);
    });

    test('Verify that the user can navigate to the Accounts menu from the side menu.', async () => {
        await loginPage.validLogin(data.Adminlogin.username, data.Adminlogin.password);
        await sideMenu.clickMenuName("Account");
        const actualtext = await accountPage.getMyAccountTextElement();
        await expect(actualtext).toBeVisible();
        await expect(actualtext).toHaveText("My Account");
    });

    test('Verify that the Account details are visible in the My Account screen.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        await sideMenu.clickMenuName("Account");
        await expect(await accountPage.getAccountdetails("Sub")).toHaveText("Sub");
        await expect(await accountPage.getAccountdetails("First Name")).toHaveText("First Name");
        await expect(await accountPage.getAccountdetails("Last Name")).toHaveText("Last Name");
        await expect(await accountPage.getAccountdetails("Email")).toHaveText("Email");
        await expect(await accountPage.getAccountdetail("Webhook URL")).toHaveText("Webhook URL");
        await expect(await accountPage.getAccountdetail("Webhook Key")).toHaveText("Webhook Key");
        await expect(await accountPage.getAccountdetail("API Key")).toHaveText("API Key");
    });

    test.only('Verify that the i icons provide the correct tooltips when hovered over.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        await sideMenu.clickMenuName("Account");
        await expect(await accountPage.testWebHookURLIconHoverText()).toBeVisible();
        await expect(await accountPage.testWebHookURLIconHoverText()).toHaveText('Notifications about transactions can be sent as HTTP requests to a given URL.');
        const hoverTextElement1 = await accountPage.testWebAPIKeyIconHoverText();
        await expect(hoverTextElement1).toBeVisible();
        await expect(hoverTextElement1).toHaveText('To use the Etana Digital API, include this key as a header in each HTTP request:');
        const hoverTextElement2 = await accountPage.testWebHookKeyIconHoverText();
        await expect(hoverTextElement2).toBeVisible();
        await expect(hoverTextElement2).toHaveText('Use this 32-byte key to decode webhooks with AES.');
    });

    test('Verify that the user can copy the Webhook Key and API Key successfully.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        await sideMenu.clickMenuName("Account");
        const actualtext = await accountPage.getWebhookKeyToastValues();
        console.log(actualtext);
        await expect(actualtext).toBeVisible();
        // await expect(actualtext).toHaveText("Webhook key copied to clipboard.");
    });



    test('Verify that the "Verified" text is displayed next to the email ID for the new Investor user.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        await sideMenu.clickMenuName("Account");
        const actualtext = await accountPage.getAccountdetail("Verified");
        await expect(actualtext).toBeVisible();
        await expect(actualtext).toHaveText("Verified");
    });



})
