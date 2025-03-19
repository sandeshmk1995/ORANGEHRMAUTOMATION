import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { PIMPage } from '../../pages/PIMPage';
const testdatas = JSON.parse(JSON.stringify(require('../../test data/employee_data.json')));

let page;
let loginPage;
let homePage;
let pimPage;
let emplId;

test.beforeEach(async ({ browser }) => {
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  pimPage = new PIMPage(page);

  await loginPage.navigateToLoginPage()
  await loginPage.loginToApp(process.env.USER_NAME, process.env.PASSWORD);
  let header = await homePage.getHeaderLabel();
  expect(header).toBe("Dashboard");
});

test.afterAll(async () => {
  await loginPage.logOutToApp();
});

test('Verify user able to create new employee successfully@smoke@regression', async ({ }) => {
  test.setTimeout(60000);
  await test.step('Verify able to create new employee by admin user', async () => {
    
    await homePage.clickOnSidePanelTab("PIM");
    let header = await homePage.getHeaderLabel();
    expect(header).toBe("PIM");

    for(const testdata of testdatas){
      await pimPage.clickOnAddEmployeeTab();
      emplId = await pimPage.getRandomNumberString();
      await pimPage.addNewEmployee(testdata.firstname,testdata.middlename,testdata.lastname,emplId);
      let emplName = await pimPage.getEmployeeName();
      console.log(">>>>"+emplName)
      expect(emplName).toBe(testdata.firstname + " " + testdata.lastname)
  
      let firstName = await pimPage.getfirstName();
      console.log(">>>>"+firstName)
      expect(firstName).toBe(testdata.firstname)
  
      let middleName = await pimPage.getmiddleName();
      console.log(">>>>"+middleName)
      expect(middleName).toBe(testdata.middlename)
  
      let lastName = await pimPage.getlastName();
      console.log(">>>>"+lastName)
      expect(lastName).toBe(testdata.lastname)
    }
    
  });
})