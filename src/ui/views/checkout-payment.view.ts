import {
  BankTransferModel,
  CreditCardModel,
  GiftCardModel,
} from '@_src/ui/models/payment.model';
import { Page } from '@playwright/test';

export class CheckoutPaymentView {
  paymentTitle = this.page.getByRole('heading', { name: 'Payment' });
  paymentMethodDropdown = this.page.locator('[data-test="payment-method"]');
  bankNameInput = this.page.locator('[data-test="bank_name"]');
  accountNameInput = this.page.locator('[data-test="account_name"]');
  accountNumberInput = this.page.locator('[data-test="account_number"]');
  creditCardNumberInput = this.page.locator('[data-test="credit_card_number"]');
  expirationDateInput = this.page.locator('[data-test="expiration_date"]');
  CVVInput = this.page.locator('[data-test="cvv"]');
  cardHolderNameInput = this.page.locator('[data-test="card_holder_name"]');
  monthlyInstallmentsDropdown = this.page.locator(
    '[data-test="monthly_installments"]',
  );
  giftNardNumberInput = this.page.locator('[data-test="gift_card_number"]');
  validationCodeInput = this.page.locator('[data-test="validation_code"]');
  bankNameError = this.page.getByText(/Bank name can/);
  accountNameError = this.page.getByText(/Account name can/);
  accountNumberError = this.page.getByText(/Account number must/);
  creditCardNumberError = this.page.getByText('Invalid card number format.');
  expirationDateInvalidFormatError =
    this.page.getByText(/Invalid date format./);
  expirationDatePastError = this.page.getByText(
    'Expiration date must be in the future.',
  );
  CVVError = this.page.getByText('CVV must be 3 or 4 digits.');
  monthlyInstallmentsError = this.page.getByText(
    /number of monthly installments/,
  );

  giftNardNumberError = this.page.getByText(
    'Gift card number must be alphanumeric.',
  );
  validationCodeError = this.page.getByText(
    'Validation code must be alphanumeric.',
  );
  confirmButton = this.page.locator('[data-test="finish"]');
  successfulPaymentMessage = this.page.getByText('Payment was successful');

  constructor(private page: Page) {}

  async selectPaymentMethod(paymentMethod: string): Promise<void> {
    await this.paymentMethodDropdown.selectOption(paymentMethod);
  }

  async payWithBankTransfer(
    bankTransferData: BankTransferModel,
  ): Promise<void> {
    await this.bankNameInput.fill(bankTransferData.paymentDetails.bankName);
    await this.accountNameInput.fill(
      bankTransferData.paymentDetails.accountName,
    );
    await this.accountNumberInput.fill(
      bankTransferData.paymentDetails.accountNumber,
    );
  }

  async payWithCreditCard(creditCardData: CreditCardModel): Promise<void> {
    await this.creditCardNumberInput.fill(
      creditCardData.paymentDetails.creditCardNumber,
    );
    await this.expirationDateInput.fill(
      creditCardData.paymentDetails.expirationDate,
    );
    await this.CVVInput.fill(creditCardData.paymentDetails.cvv);

    await this.cardHolderNameInput.fill(
      creditCardData.paymentDetails.cardHolderName,
    );
  }

  async payWithBuyNowPayLater(monthlyInstallments: string): Promise<void> {
    await this.monthlyInstallmentsDropdown.selectOption(monthlyInstallments);
  }

  async payWithGiftCard(giftCardData: GiftCardModel): Promise<void> {
    await this.giftNardNumberInput.fill(
      giftCardData.paymentDetails.giftCardNumber,
    );
    await this.validationCodeInput.fill(
      giftCardData.paymentDetails.validationCode,
    );
  }

  async confirmPayment(): Promise<void> {
    await this.confirmButton.click();
  }
}
