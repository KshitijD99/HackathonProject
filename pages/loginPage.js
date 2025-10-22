import loginLocators from "../locators/loginLocators.json";
import testData from "../utils/loginData.json";

export class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async loginWithInvalidCred() {
    await this.page
      .locator(loginLocators.LoginPageLocators.loginLocator)
      .click();

    await this.page
      .getByRole(loginLocators.LoginPageLocators.getByRoleEmailTextBox.role, {
        name: loginLocators.LoginPageLocators.getByRoleEmailTextBox.name,
      })
      .pressSequentially(testData.email, { delay: 200 });

    const continueButton = this.page.getByRole(
      loginLocators.LoginPageLocators.getByRoleButtonContinue.role,
      {
        name: loginLocators.LoginPageLocators.getByRoleButtonContinue.name,
        exact: true,
      }
    );

    if (await continueButton.isVisible()) {
      await continueButton.click();
    }
    await this.page
      .getByRole(
        loginLocators.LoginPageLocators.getByRolePasswordTextBox.role,
        { name: loginLocators.LoginPageLocators.getByRolePasswordTextBox.name }
      )
      .pressSequentially(testData.wrongPassword, { delay: 200 });
    const nextButton = this.page.getByRole(
      loginLocators.LoginPageLocators.getByRoleButtonNext.role,
      {
        name: loginLocators.LoginPageLocators.getByRoleButtonNext.name,
        exact: true,
      }
    );
    if (await nextButton.isVisible()) {
      await nextButton.click();
    } else {
      await this.page
        .getByRole(loginLocators.LoginPageLocators.getByRoleButtonLogin.role, {
          name: loginLocators.LoginPageLocators.getByRoleButtonLogin.name,
        })
        .click();
    }
  }

  async forgotPassword() {
    await this.page
      .locator(loginLocators.LoginPageLocators.loginLocator)
      .click();
    await this.page
      .getByRole(loginLocators.LoginPageLocators.getByRoleEmailTextBox.role, {
        name: loginLocators.LoginPageLocators.getByRoleEmailTextBox.name,
      })
      .waitFor();

    const forgotPassButton = this.page.getByRole(
      loginLocators.LoginPageLocators.getByRoleButtonForgotPass.role,
      {
        name: loginLocators.LoginPageLocators.getByRoleButtonForgotPass.name,
      }
    );
    const visibilityResult = await forgotPassButton.isVisible();
    const continueButton = this.page.getByRole(
      loginLocators.LoginPageLocators.getByRoleButtonContinue.role,
      {
        name: loginLocators.LoginPageLocators.getByRoleButtonContinue.name,
        exact: true,
      }
    );

    if (visibilityResult) {
      await forgotPassButton.click();
    } else {
      await this.page
        .getByRole(loginLocators.LoginPageLocators.getByRoleEmailTextBox.role, {
          name: loginLocators.LoginPageLocators.getByRoleEmailTextBox.name,
        })
        .pressSequentially(testData.email, { delay: 200 });
      await continueButton.click();
    }

    if (visibilityResult === false) {
      await this.page
        .getByRole(
          loginLocators.LoginPageLocators.getByRoleButtonForgotPass.role,
          {
            name: loginLocators.LoginPageLocators.getByRoleButtonForgotPass
              .name,
          }
        )
        .click();
    }

    await this.page
      .getByRole(loginLocators.LoginPageLocators.getByRoleEmailTextBox.role, {
        name: loginLocators.LoginPageLocators.getByRoleEmailTextBox.name,
      })
      .pressSequentially(testData.email, { delay: 200 });

    await this.page
      .getByRole(
        loginLocators.LoginPageLocators.getByRoleButtonResetPass.role,
        { name: loginLocators.LoginPageLocators.getByRoleButtonResetPass.name }
      )
      .click();
  }

  async joinForFree() {
    await this.page
      .locator(loginLocators.LoginPageLocators.joinForFreeLocator)
      .click();
    await this.page
      .getByRole(loginLocators.LoginPageLocators.getByRoleEmailTextBox.role, {
        name: loginLocators.LoginPageLocators.getByRoleEmailTextBox.name,
      })
      .waitFor();

    const continueButton = this.page.getByRole(
      loginLocators.LoginPageLocators.getByRoleButtonContinue.role,
      {
        name: loginLocators.LoginPageLocators.getByRoleButtonContinue.name,
        exact: true,
      }
    );

    if (await continueButton.isVisible()) {
      await this.page
        .getByRole(loginLocators.LoginPageLocators.getByRoleEmailTextBox.role, {
          name: loginLocators.LoginPageLocators.getByRoleEmailTextBox.name,
        })
        .pressSequentially(testData.newEmail, { delay: 200 });
      await continueButton.click();
    }
  }
}
