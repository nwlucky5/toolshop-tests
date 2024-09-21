import { prepareRandomContactForm } from '../../../src/factories/contact-form.factory';
import { expect, test } from '../../../src/fixtures/merge.fixture';
import { ContactFormModel } from '../../../src/models/contact-form.model';

test.describe('Contact form verification', () => {
  let contactFormData: ContactFormModel;

  test.beforeEach(async () => {
    contactFormData = prepareRandomContactForm();
  });
  test('Successful Contact form submit without attachment', async ({
    contactPage,
  }) => {
    // Arrange
    const expectedConformationMessageText =
      'Thanks for your message! We will contact you shortly.';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.conformationMessageText).toHaveText(
      expectedConformationMessageText,
    );
  });
  test('Successful Contact form submit with ".txt" attachment', async ({
    contactPage,
  }) => {
    // Arrange
    const attachmentRelativePath = 'fixtures/attachment1.txt';
    const expectedConformationMessageText =
      'Thanks for your message! We will contact you shortly.';

    // Act
    await contactPage.addAttachment(attachmentRelativePath);
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.conformationMessageText).toHaveText(
      expectedConformationMessageText,
    );
  });
  test('Unsuccessful Contact form submit with ".txt" attachment having content', async ({
    contactPage,
  }) => {
    // Arrange
    const attachmentRelativePath = 'fixtures/attachment2.txt';
    const expectedAttachmentErrorText = 'File should be empty.';

    // Act
    await contactPage.addAttachment(attachmentRelativePath);
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.attachmentError).toHaveText(
      expectedAttachmentErrorText,
    );
  });
  test('Unsuccessful Contact form submit with ".jpg" attachment', async ({
    contactPage,
  }) => {
    // Arrange
    const attachmentRelativePath = 'fixtures/image1.jpg';
    const expectedAttachmentErrorText = 'File should be empty.';

    // Act
    await contactPage.addAttachment(attachmentRelativePath);
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.attachmentError).toHaveText(
      expectedAttachmentErrorText,
    );
  });
  test('Unsuccessful Contact form submit without any of the required values', async ({
    contactPage,
  }) => {
    // Arrange
    contactFormData.firstName = '';
    contactFormData.lastName = '';
    contactFormData.emailAddress = '';
    contactFormData.message = '';
    const expectedFirstNameErrorText = 'First name is required';
    const expectedLastNameErrorText = 'Last name is required';
    const expectedEmailAddressErrorText = 'Email is required';
    const expectedSubjectErrorText = 'Subject is required';
    const expectedMessageErrorText = 'Message is required';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData, '');

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
  test('Unsuccessful submit of Contact form with no message value', async ({
    contactPage,
  }) => {
    // Arrange
    contactFormData.message = '';
    const expectedMessageErrorText = 'Message is required';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.messageError).toHaveText(expectedMessageErrorText);
  });
  test('Unsuccessful submit of Contact form with message field having 49 characters', async ({
    contactPage,
  }) => {
    // Arrange
    const contactFormData = prepareRandomContactForm(49);
    const expectedMessageErrorText = 'Message must be minimal 50 characters';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.messageError).toHaveText(expectedMessageErrorText);
  });
  test('Unsuccessful submit of Contact form with no email value', async ({
    contactPage,
  }) => {
    // Arrange
    contactFormData.emailAddress = '';
    const expectedEmailAddressErrorText = 'Email is required';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.emailAddressError).toHaveText(
      expectedEmailAddressErrorText,
    );
  });
  test('Unsuccessful submit of Contact form with incorrectly formatted email', async ({
    contactPage,
  }) => {
    // Arrange
    contactFormData.emailAddress = 'email';
    const expectedEmailErrorText = 'Email format is invalid';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.emailAddressError).toHaveText(
      expectedEmailErrorText,
    );
  });
  test('Unsuccessful submit of Contact form with no first name value', async ({
    contactPage,
  }) => {
    // Arrange
    contactFormData.firstName = '';
    const expectedFirstNameErrorText = 'First name is required';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.firstNameError).toHaveText(
      expectedFirstNameErrorText,
    );
  });
  test('Unsuccessful submit of Contact form with no last name value', async ({
    contactPage,
  }) => {
    // Arrange
    contactFormData.lastName = '';
    const expectedLastNameErrorText = 'Last name is required';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData);

    // Assert
    await expect(contactPage.lastNameError).toHaveText(
      expectedLastNameErrorText,
    );
  });
  test('Unsuccessful submit of Contact form with no subject value', async ({
    contactPage,
  }) => {
    // Arrange
    const expectedSubjectErrorText = 'Subject is required';

    // Act
    await contactPage.populateAndSendContactForm(contactFormData, '');

    // Assert
    await expect(contactPage.subjectError).toHaveText(expectedSubjectErrorText);
  });
});
