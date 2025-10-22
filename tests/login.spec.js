import { test, expect } from "@playwright/test";
import testData from "../utils/loginData.json";
import { LoginPage } from "../pages/loginPage";
import loginLocators from "../locators/loginLocators.json";

test.describe("Login Functionality", () => {
  test.beforeEach("Login Before Each Test", async ({ page }) => {
    await page.goto("https://www.coursera.org/");
  });

  //Verify Login with Invalid Credentials
  test("TC-016 : Verify Login with Invalid Credentials", async ({ page }) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.loginWithInvalidCred();
    const errorMsgLocator = page.getByText(
      loginLocators.LoginPageLocators.getByTextErrorMsg
    );
    await expect(errorMsgLocator).toBeVisible();
  });

  //Verify "Forgot Password" Link Navigation
  test('TC-017 : Verify "Forgot Password" Link Navigation', async ({
    page,
  }) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.forgotPassword();
    const resetPassPage = page.getByText(
      loginLocators.LoginPageLocators.getByTextResetMsg
    );
    await expect(resetPassPage).toBeVisible();
  });

  //Verify Navigation to the "Join for Free" (Sign-Up) Page
  test('TC-018 : Verify Navigation to the "Join for Free" (Sign-Up) Page', async ({
    page,
  }) => {
    const loginObj = new LoginPage(page);
    await loginObj.joinForFree();
    const SignUpPageLocator = page.getByRole(
      loginLocators.LoginPageLocators.getByRoleButtonJoinForFree.role,
      {
        name: loginLocators.LoginPageLocators.getByRoleButtonJoinForFree.name,
      }
    );
    await expect(SignUpPageLocator).toBeVisible();
  });

  //Validate Sign-Up Form with an Existing Email
  test.only("TC-019 : Validate Sign-Up Form with an Existing Email", async ({
    page,
  }) => {
    const loginPageObj = new LoginPage(page);
    await loginPageObj.existingEmailSignup();
    const emailErrorMsg = page.getByText(
      loginLocators.LoginPageLocators.getByTextEmailErrorMsg
    );
    await expect(emailErrorMsg).toBeVisible();
  });

  //Verify Login with valid Credentials
  test("TC-020 : Verify Login with valid Credentials", async ({ page }) => {
    const loginPageObj=new LoginPage(page);
    await loginPageObj.loginWithValidCred();
    const loginMsgLocator = page.getByText(loginLocators.LoginPageLocators.getByTextSuccessfullLogin);
    await expect(loginMsgLocator).toBeVisible();
  });
});
