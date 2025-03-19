const { expect } = require('@playwright/test');
exports.Utils = 
class Utils{

constructor(page){
  this.page=page;
  this.headerLabel = '.oxd-topbar-header-breadcrumb h6';
}

async clickOn(locator){
  await this.page.waitForSelector(locator, { state: 'visible' }, { timeout: 60000 });
  await this.page.click(locator);
}

async enterText(locator,text){
  await this.page.waitForSelector(locator, { state: 'visible' }, { timeout: 60000 });
  await this.page.fill(locator, text);
}

async getText(locator){
  await this.page.waitForSelector(locator, { state: 'visible' }, { timeout: 60000 });
  return await this.page.locator(locator).textContent();
}

async selectDropDown(locator,option){
  await this.page.waitForSelector(locator, { state: 'visible' });
  await this.page.selectOption(locator, { label: option });
}

async getHeaderLabel(){
  return await this.getText(this.headerLabel);
}

async clickOnSidePanelTab(tabName){
  const xpath = `//*[@class='oxd-sidepanel-body']//span[text()="${tabName}"]`
  await this.page.waitForSelector(xpath, { state: 'visible' });
  await this.page.click(xpath);
}

async getRandomNumberString(){
 let id =  ((Date.now() % 1000000000) + Math.floor(Math.random() * 1000)).toString();
 return id;
}

}