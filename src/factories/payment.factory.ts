import {
  BankTransferModel,
  CreditCardModel,
  GiftCardModel,
} from '@_src/models/payment.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomBankTransfer(): BankTransferModel {
  const bankTransferData: BankTransferModel = {
    payment_method: 'Bank Transfer',
    payment_details: {
      bank_name: `${faker.company.name().replace(/[^A-Za-z]/g, '')} Bank`,
      account_name: faker.finance.accountName(),
      account_number: faker.finance.accountNumber(),
    },
  };

  return bankTransferData;
}

export function prepareRandomCreditCard(): CreditCardModel {
  const creditCardData: CreditCardModel = {
    payment_method: 'Credit Card',
    payment_details: {
      credit_card_number: faker.finance.creditCardNumber('####-####-####-####'),
      expiration_date: '',
      cvv: faker.finance.creditCardCVV(),
      card_holder_name: faker.finance.creditCardIssuer(),
    },
  };

  creditCardData.payment_details.expiration_date = faker.date
    .future()
    .toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    });

  creditCardData.payment_details.card_holder_name = `${faker.person.firstName().replace(/[^A-Za-z]/g, '')} 
    ${faker.person.lastName().replace(/[^A-Za-z]/g, '')}`;

  return creditCardData;
}

export function prepareRandomGiftCard(): GiftCardModel {
  const giftCardData: GiftCardModel = {
    payment_method: 'Gift Card',
    payment_details: {
      gift_card_number: faker.string.alphanumeric({
        length: 20,
        casing: 'upper',
      }),
      validation_code: faker.string.alphanumeric(6),
    },
  };

  return giftCardData;
}
