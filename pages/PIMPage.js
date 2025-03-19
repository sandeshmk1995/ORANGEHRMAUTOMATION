const { expect } = require('@playwright/test');
const { Utils } = require('../utility/Utils');
exports.PIMPage =
  class PIMPage extends Utils{
    constructor(page) {
      super(page);   
      this.addEmployee="//a[text()='Add Employee']";
      this.firstName="[name='firstName']";
      this.lastName="[name='lastName']";
      this.middleName="[name='middleName']";
      this.emplId="(//input[@class='oxd-input oxd-input--active'])[last()]";
      this.saveButton="[type='submit']";
      this.emplName = '.orangehrm-edit-employee-name h6'
     
    }

    async clickOnAddEmployeeTab(){
      await this.clickOn(this.addEmployee);
    }

    async addNewEmployee(fname,mname,lname,id){
      await this.enterText(this.firstName,fname);
      await this.enterText(this.middleName,mname);
      await this.enterText(this.lastName,lname);
      await this.page.locator(this.emplId).clear();
      await this.clickOn(this.emplId)
      await this.enterText(this.emplId,id);
      await this.clickOn(this.saveButton)
      await this.page.waitForLoadState('load', { timeout: 90000 }); 
    }

    async getEmployeeName(){
      return await this.getText(this.emplName);
    }

    async getfirstName(){
      return await this.page.inputValue(this.firstName);
    }

    async getmiddleName(){
      return await this.page.inputValue(this.middleName);
    }

    async getlastName(){
      return await this.page.inputValue(this.lastName);
    }
  }