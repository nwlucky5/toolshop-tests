import { MainMenuComponent } from '../components/main-menu.component';
import { LoginUserModel } from '../models/user.model';
import { Page } from '@playwright/test';

export class LoginPage {
  url = '/auth/login';
  loginTitle = this.page.getByRole('heading', { name: 'Login' });
  emailInput = this.page.locator('[data-test="email"]');
  passwordInput = this.page.locator('[data-test="password"]');
  emailError = this.page.locator('[data-test="email-error"]');
  passwordError = this.page.locator('[data-test="password-error"]');
  loginError = this.page.locator('[data-test="login-error"]');
  loginButton = this.page.locator('[data-test="login-submit"]');

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async login(loginUserData: LoginUserModel): Promise<void> {
    await this.emailInput.fill(loginUserData.userEmail);
    await this.passwordInput.fill(loginUserData.userPassword);
    await this.loginButton.click();
  }
}
