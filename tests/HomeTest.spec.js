const { test, expect } = require('@playwright/test');
const data = require('../data/users.json');
const { LoginPage } = require('../pages/loginPage.js');
const { SideMenu } = require('../pages/sideMenuPage.js');
const { HomePage } = require('../pages/homePage.js');

test.describe.parallel('Home Page Functionality', () => {
    let loginPage;
    let sideMenu;
    let homePage;

    const expectedMenuOptions = [
        'Home',
        'Withdrawals',
        'Deposits',
        'Wallets',
        'Organization',
        'Account',
        'Logout'
    ];

    const expectedCurrencies = [
        'ADA:', 'APT:', 'AVAX:',
        'BTC:', 'ETH:', 'LINK:',
        'MATIC:', 'POLYX:', 'SOL:',
        'SUI:', 'TRX:', 'UNI:',
        'USDC:', 'USDT:', 'WND:',
        'XLM:', 'XRP:'
    ];

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        sideMenu = new SideMenu(page);
        homePage = new HomePage(page);
        await loginPage.navigate(config.baseUrl);
    });

    test('@smoke Verify Navigation to the Home Menu from the Side Menu', async () => {
        await loginPage.validLogin(data.Adminlogin.username, data.Adminlogin.password);
        await sideMenu.clickMenuName("Logout");
        await sideMenu.clickMenuName("Home");
        await homePage.getAdminTextElement();
        await homePage.getetanaTrustTextElement();
        await homePage.getdashboardTextElement();
    });

    test('@smoke @regression Verify that the side menu options are visible and displayed in the correct order along with the Etana Digital logo.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        await sideMenu.getEtanaLogo();
        const actualMenuOrder  = await homePage.verifySideMenuOrder();
        expect(actualMenuOrder).toEqual(expectedMenuOptions);
    });

    test('@smoke @regression Verify that the hamburger menu is functional and consistently shows or hides the side panel.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        await sideMenu.clickElementMultipleTimes(4);
    });

    test('@smoke @regression Verify that the user name, currency type, and currency values are displayed correctly on the home screen.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        // await homePage.verifyCurrencyValues();
        const actualCurrentyType = await homePage.verifyCurrencyTypes();
        expect(actualCurrentyType).toEqual(expectedCurrencies);
    });

    test('@smoke @regression Verify that user click on the Notification icon and see the Notifications displayed.', async () => {
        await loginPage.validLogin(config.Adminlogin.username, config.Adminlogin.password);
        const alert = await homePage.clickNotificationElement();
        await expect(alert).toBeVisible();
        await expect(alert).toHaveText("No notifications");
    });
});
