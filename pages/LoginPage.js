const { expect } = require('@playwright/test');
const { Utils } = require('../utility/Utils');
//require('.env').config();
exports.LoginPage =
  class LoginPage extends Utils {

    constructor(page) {
      super(page);
      this.url = 'https://www.saucedemo.com/v1/index.html';
      this.userName = "[name='username']";
      this.passwordElement = "[name='password']";
      this.loginButton = "[type='submit']";
      this.userIcon = '.oxd-topbar-header-userarea p';
      this.sideMenuElement = "//button[text()='Open Menu']";
      this.logoutElement = "//a[normalize-space()='Logout']";

    }

    async navigateToLoginPage() {
      await this.page.goto(process.env.URL);
      const un = await this.page.locator(this.userName)
      await expect(un).toBeVisible();
    }

    async loginToApp(username, password) {
      await this.enterText(this.userName, username);
      await this.enterText(this.passwordElement, password);
      await this.clickOn(this.loginButton);
      const appLogo = await this.page.locator(this.userIcon);
      await expect(appLogo).toBeVisible();
    }

    async logOutToApp() {
      await this.clickOn(this.userIcon);
      await this.clickOn(this.logoutElement);
      await this.page.waitForSelector(this.userName, { state: 'visible' }, { timeout: 60000 });
      const userNameElement = await this.page.locator(this.userName);
      await expect(userNameElement).toBeVisible();
    }

  }