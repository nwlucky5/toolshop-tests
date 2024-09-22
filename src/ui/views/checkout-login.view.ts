import { LoginUserModel } from '@_src/ui/models/user.model';
import { Page } from '@playwright/test';

export class CheckoutLoginView {
  loginTitle = this.page.getByRole('heading', { name: 'Login' });
  emailInput = this.page.locator('[data-test="email"]');
  passwordInput = this.page.locator('[data-test="password"]');
  emailError = this.page.locator('[data-test="email-error"]');
  passwordError = this.page.locator('[data-test="password-error"]');
  loginError = this.page.locator('[data-test="login-error"]');
  loginButton = this.page.locator('[data-test="login-submit"]');
  proceedToCheckoutButton = this.page.locator('[data-test="proceed-2"]');
  signedInUserMessage = this.page.getByText(
    /you are already logged in. You can proceed to checkout./,
  );

  constructor(private page: Page) {}

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.emailInput.fill(loginUserData.userEmail);
    await this.passwordInput.fill(loginUserData.userPassword);
    await this.loginButton.click();
  }
}
