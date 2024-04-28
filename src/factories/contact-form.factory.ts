import { ContactFormModel } from '../models/contact-form.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomContactForm(
  messageCharactersCount: number = 50,
): ContactFormModel {
  const contactFormData: ContactFormModel = {
    firstName: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    lastName: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    emailAddress: '',
    message: faker.string.alphanumeric(messageCharactersCount),
  };

  contactFormData.emailAddress = faker.internet.email({
    firstName: contactFormData.emailAddress,
    lastName: contactFormData.lastName,
  });

  return contactFormData;
}
