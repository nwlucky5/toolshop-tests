export interface BankTransferModel {
  payment_method: 'Bank Transfer';
  payment_details: {
    bank_name: string;
    account_name: string;
    account_number: string;
  };
}

export interface CreditCardModel {
  payment_method: 'Credit Card';
  payment_details: {
    credit_card_number: string;
    expiration_date: string;
    cvv: string;
    card_holder_name: string;
  };
}

export interface GiftCardModel {
  payment_method: 'Gift Card';
  payment_details: {
    gift_card_number: string;
    validation_code: string;
  };
}
