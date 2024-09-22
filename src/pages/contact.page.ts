import { MainMenuComponent } from '@_src/components/main-menu.component';
import { ContactFormModel } from '@_src/models/contact-form.model';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class ContactPage extends BasePage {
  url = '/contact';
  contactTitle = this.page.getByRole('heading', { name: 'Contact' });
  firstNameInput = this.page.locator('[data-test="first-name"]');
  lastNameInput = this.page.locator('[data-test="last-name"]');
  emailAddressInput = this.page.locator('[data-test="email"]');
  subjectDropdown = this.page.locator('[data-test="subject"]');
  messageInput = this.page.locator('[data-test="message"]');
  attachmentButton = this.page.locator('[data-test="attachment"]');
  firstNameError = this.page.locator('[data-test="first-name-error"]');
  lastNameError = this.page.locator('[data-test="last-name-error"]');
  emailAddressError = this.page.locator('[data-test="email-error"]');
  subjectError = this.page.locator('[data-test="subject-error"]');
  messageError = this.page.locator('[data-test="message-error"]');
  attachmentError = this.page.locator('[data-test="attachment-error"]');
  sendButton = this.page.locator('[data-test="contact-submit"]');
  conformationMessageText = this.page.locator('.alert-success');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);

  async populateAndSendContactForm(
    contactFormData: ContactFormModel,
    subjectOption: string = 'return',
  ): Promise<void> {
    await this.firstNameInput.fill(contactFormData.firstName);
    await this.lastNameInput.fill(contactFormData.lastName);
    await this.emailAddressInput.fill(contactFormData.emailAddress);
    await this.subjectDropdown.selectOption(subjectOption);
    await this.messageInput.fill(contactFormData.message);
    await this.sendButton.click();
  }

  async addAttachment(attachmentRelativePath: string): Promise<void> {
    await this.attachmentButton.setInputFiles(attachmentRelativePath);
  }
}
