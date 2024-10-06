import {
  BankTransferModel,
  CreditCardModel,
  GiftCardModel,
} from '@_src/ui/models/payment.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomBankTransfer(): BankTransferModel {
  const bankTransferData: BankTransferModel = {
    paymentMethod: 'Bank Transfer',
    paymentDetails: {
      bankName: `${faker.company.name().replace(/[^A-Za-z]/g, '')} Bank`,
      accountName: faker.finance.accountName(),
      accountNumber: faker.finance.accountNumber(),
    },
  };

  return bankTransferData;
}

export function prepareRandomCreditCard(): CreditCardModel {
  const creditCardData: CreditCardModel = {
    paymentMethod: 'Credit Card',
    paymentDetails: {
      creditCardNumber: faker.finance.creditCardNumber('####-####-####-####'),
      expirationDate: '',
      cvv: faker.finance.creditCardCVV(),
      cardHolderName: faker.finance.creditCardIssuer(),
    },
  };

  creditCardData.paymentDetails.expirationDate = faker.date
    .future()
    .toLocaleDateString('en-US', {
      month: '2-digit',
      year: 'numeric',
    });

  creditCardData.paymentDetails.cardHolderName = `${faker.person.firstName().replace(/[^A-Za-z]/g, '')} 
    ${faker.person.lastName().replace(/[^A-Za-z]/g, '')}`;

  return creditCardData;
}

export function prepareRandomGiftCard(): GiftCardModel {
  const giftCardData: GiftCardModel = {
    paymentMethod: 'Gift Card',
    paymentDetails: {
      giftCardNumber: faker.string.alphanumeric({
        length: 20,
        casing: 'upper',
      }),
      validationCode: faker.string.alphanumeric(6),
    },
  };

  return giftCardData;
}
