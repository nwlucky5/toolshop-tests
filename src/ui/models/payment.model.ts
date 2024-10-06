export interface BankTransferModel {
  paymentMethod: 'Bank Transfer';
  paymentDetails: {
    bankName: string;
    accountName: string;
    accountNumber: string;
  };
}

export interface CreditCardModel {
  paymentMethod: 'Credit Card';
  paymentDetails: {
    creditCardNumber: string;
    expirationDate: string;
    cvv: string;
    cardHolderName: string;
  };
}

export interface GiftCardModel {
  paymentMethod: 'Gift Card';
  paymentDetails: {
    giftCardNumber: string;
    validationCode: string;
  };
}
