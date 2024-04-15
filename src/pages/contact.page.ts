import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class ContactPage {
  url = '/#/contact';
  contactTitle = this.page.getByRole('heading', { name: 'Contact' });
  firstNameInput = this.page.locator('[data-test="first-name"]');
  lastNameInput = this.page.locator('[data-test="last-name"]');
  emailAddressInput = this.page.locator('[data-test="email"]');
  subjectDropdown = this.page.locator('[data-test="subject"]');
  messageInput = this.page.locator('[data-test="message"]');
  firstNameError = this.page.locator('[data-test="first-name-error"]');
  lastNameError = this.page.locator('[data-test="last-name-error"]');
  emailAddressError = this.page.locator('[data-test="email-error"]');
  subjectError = this.page.locator('[data-test="subject-error"]');
  messageError = this.page.locator('[data-test="message-error"]');
  submitButton = this.page.locator('[data-test="contact-submit"]');

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
