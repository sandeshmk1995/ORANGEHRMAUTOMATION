import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';

let page;
let loginPage;
let homePage;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
});

test.afterAll(async () => {
  await loginPage.logOutToApp();
});

test('Verify user able to login successfully@smoke', async ({ }) => {

  await test.step('Verify login with valid credentials', async () => {
    await loginPage.navigateToLoginPage()
    await loginPage.loginToApp(process.env.USER_NAME, process.env.PASSWORD);
    let header = await homePage.getHeaderLabel();
    expect(header).toBe("Dashboard");
    await homePage.clickOnSidePanelTab("PIM");
    header = await homePage.getHeaderLabel();
    expect(header).toBe("PIM");
  });
})