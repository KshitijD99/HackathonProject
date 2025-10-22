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
  test.only('TC-018 : Verify Navigation to the "Join for Free" (Sign-Up) Page', async ({
    page,
  }) => {
    const loginObj=new LoginPage(page);
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
  test("TC-019 : Validate Sign-Up Form with an Existing Email", async ({
    page,
  }) => {
    await page.locator('a[data-track-href="/?authMode=signup"]').click();
    await page.getByRole("textbox", { name: "Email" }).waitFor();

    const continueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });

    if (await continueButton.isVisible()) {
      await page
        .getByRole("textbox", { name: "Email" })
        .pressSequentially(testData.newEmail, { delay: 200 });
      await continueButton.click();
    } else {
      await page
        .getByRole("textbox", { name: "Email" })
        .pressSequentially(testData.email, { delay: 200 });
      await page
        .getByRole("textbox", { name: "Full Name" })
        .pressSequentially(testData.name, { delay: 200 });
      await page
        .getByRole("textbox", { name: "Password" })
        .pressSequentially(testData.wrongPassword, { delay: 200 });
      await page.getByRole("button", { name: "Join for Free" }).click();
    }

    const emailErrorMsg = page.getByText(
      "Looks like you already have an account with that email address. Please"
    );
    await expect(emailErrorMsg).toBeVisible();
  });

  //Verify Login with valid Credentials
  test("TC-020 : Verify Login with valid Credentials", async ({ page }) => {
    await page.locator('a[data-track-href="/?authMode=login"]').click();

    await page
      .getByRole("textbox", { name: "Email" })
      .pressSequentially(testData.email, { delay: 200 });
    const continueButton = page.getByRole("button", {
      name: "Continue",
      exact: true,
    });
    if (await continueButton.isVisible()) {
      await continueButton.click();
    }
    await page
      .getByRole("textbox", { name: "Password" })
      .pressSequentially(testData.password, { delay: 200 });
    const nextButton = page.getByRole("button", { name: "Next", exact: true });
    if (await nextButton.isVisible()) {
      await nextButton.click();
    } else {
      await page.getByRole("button", { name: "Login" }).click();
    }
    const loginMsgLocator = page.getByText("Welcome, Kshitij!");
    await expect(loginMsgLocator).toBeVisible();
  });
});
