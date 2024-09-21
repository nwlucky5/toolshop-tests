import { prepareRandomBillingAddress } from '../../../src/factories/billing-address.factory';
import { prepareRandomBankTransfer } from '../../../src/factories/payment.factory';
import { expect, test } from '../../../src/fixtures/merge.fixture';

test.describe('Payment process verification for Bank Transfer', () => {
  test.beforeEach(
    async ({
      addProductToCart,
      checkoutCartView,
      checkoutLoginView,
      checkoutBillingAddressView,
    }) => {
      const productPage = addProductToCart.productPage;
      const billingAddressData = prepareRandomBillingAddress();
      await productPage.mainMenu.shoppingCartIcon.click();
      await checkoutCartView.proceedToCheckoutButton.click();
      await checkoutLoginView.proceedToCheckoutButton.click();
      await checkoutBillingAddressView.fillBillingAddress(billingAddressData);
    },
  );

  test('successful payment for bank transfer @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Bank Transfer';
    const bankTransferData = prepareRandomBankTransfer();

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithBankTransfer(bankTransferData);
    await checkoutPaymentView.confirmPayment();

    // Assert
    await expect(checkoutPaymentView.successfulPaymentMessage).toHaveText(
      'Payment was successful',
    );
  });

  test('unsuccessful payment for bank transfer with invalid bank name value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Bank Transfer';
    const expectedBankNameError =
      'Bank name can only contain letters and spaces.';
    const bankTransferData = prepareRandomBankTransfer();
    bankTransferData.payment_details.bank_name = '1';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithBankTransfer(bankTransferData);

    // Assert
    await expect(checkoutPaymentView.bankNameError).toHaveText(
      expectedBankNameError,
    );
  });

  test('unsuccessful payment for bank transfer with invalid account name value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Bank Transfer';
    const expectedAccountNameError =
      'Account name can contain letters, numbers, spaces, periods, apostrophes, and hyphens.';
    const bankTransferData = prepareRandomBankTransfer();
    bankTransferData.payment_details.account_name = '!';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithBankTransfer(bankTransferData);

    // Assert
    await expect(checkoutPaymentView.accountNameError).toHaveText(
      expectedAccountNameError,
    );
  });

  test('unsuccessful payment for bank transfer with invalid account number value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Bank Transfer';
    const expectedAccountNumberError = 'Account number must be numeric.';
    const bankTransferData = prepareRandomBankTransfer();
    bankTransferData.payment_details.account_number = 'number';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithBankTransfer(bankTransferData);

    // Assert
    await expect(checkoutPaymentView.accountNumberError).toHaveText(
      expectedAccountNumberError,
    );
  });
});
