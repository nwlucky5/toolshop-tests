import { MainMenuComponent } from '@_src/ui/components/main-menu.component';
import { RegisterUserModel } from '@_src/ui/models/register-model';
import { BasePage } from '@_src/ui/pages/base.page';
import { Page } from '@playwright/test';

export class RegisterPage extends BasePage {
  url = '/auth/register';
  registerTitle = this.page.getByRole('heading', {
    name: 'Customer registration',
  });
  firstNameInput = this.page.locator('[data-test="first-name"]');
  lastNameInput = this.page.locator('[data-test="last-name"]');
  dateOfBirthPicker = this.page.locator('[data-test="dob"]');
  addressInput = this.page.locator('[data-test="address"]');
  postcodeInput = this.page.locator('[data-test="postcode"]');
  cityInput = this.page.locator('[data-test="city"]');
  stateInput = this.page.locator('[data-test="state"]');
  countryDropdown = this.page.locator('[data-test="country"]');
  phoneInput = this.page.locator('[data-test="phone"]');
  emailInput = this.page.locator('[data-test="email"]');
  passwordInput = this.page.locator('[data-test="password"]');
  registerButton = this.page.locator('[data-test="register-submit"]');
  firstNameError = this.page.locator('[data-test="first-name-error"]');
  lastNameError = this.page.locator('[data-test="last-name-error"]');
  dateOfBirthError = this.page.locator('[data-test="dob-error"]');
  addressError = this.page.locator('[data-test="address-error"]');
  postcodeError = this.page.locator('[data-test="postcode-error"]');
  cityError = this.page.locator('[data-test="city-error"]');
  stateError = this.page.locator('[data-test="state-error"]');
  countryError = this.page.locator('[data-test="country-error"]');
  phoneError = this.page.locator('[data-test="phone-error"]');
  emailError = this.page.locator('[data-test="email-error"]');
  passwordError = this.page.locator('[data-test="password-error"]');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async prepareRandomUser(
    randomUserData: RegisterUserModel,
    countryOption: string = 'US',
  ): Promise<void> {
    await this.firstNameInput.fill(randomUserData.firstName);
    await this.lastNameInput.fill(randomUserData.lastName);
    await this.dateOfBirthPicker.fill(randomUserData.dateOfBirth);
    await this.addressInput.fill(randomUserData.address);
    await this.postcodeInput.fill(randomUserData.postcode);
    await this.cityInput.fill(randomUserData.city);
    await this.stateInput.fill(randomUserData.state);
    await this.countryDropdown.selectOption(countryOption);
    await this.phoneInput.fill(randomUserData.phone);
    await this.emailInput.fill(randomUserData.email);
    await this.passwordInput.fill(randomUserData.password);
    await this.registerButton.click();
  }
}
