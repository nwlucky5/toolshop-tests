import { ContactPage } from '../../src/pages/contact.page';
import { expect, test } from '@playwright/test';

test.describe('Contact form verification', () => {
  test('No values in any field in Contact form', async ({ page }) => {
    // Arrange
    const expectedFirstNameErrorText = 'First name is required';
    const expectedLastNameErrorText = 'Last name is required';
    const expectedEmailAddressErrorText = 'Email is required';
    const expectedSubjectErrorText = 'Subject is required';
    const expectedMessageErrorText = 'Message is required';
    const contactPage = new ContactPage(page);

    // Act
    await contactPage.goto();
    await contactPage.submitButton.click();

    // Assert
    await expect(contactPage.firstNameError).toHaveText(
      expectedFirstNameErrorText,
    );
    await expect(contactPage.lastNameError).toHaveText(
      expectedLastNameErrorText,
    );
    await expect(contactPage.emailAddressError).toHaveText(
      expectedEmailAddressErrorText,
    );
    await expect(contactPage.subjectError).toHaveText(expectedSubjectErrorText);
    await expect(contactPage.messageError).toHaveText(expectedMessageErrorText);
  });
});
