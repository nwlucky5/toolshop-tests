import { prepareRandomBillingAddress } from '../../../src/factories/billing-address.factory';
import { prepareRandomCreditCard } from '../../../src/factories/payment.factory';
import { expect, test } from '../../../src/fixtures/merge.fixture';

test.describe('Payment process verification for Credit Card', () => {
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

  test('successful payment for credit card @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const creditCardData = prepareRandomCreditCard();

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);
    await checkoutPaymentView.confirmPayment();

    // Assert
    await expect(checkoutPaymentView.successfulPaymentMessage).toHaveText(
      'Payment was successful',
    );
  });

  test('unsuccessful payment for credit card with invalid credit card number value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedCreditCardNumberError = 'Invalid card number format.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.credit_card_number = '111122223333444';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.creditCardNumberError).toHaveText(
      expectedCreditCardNumberError,
    );
  });

  test('unsuccessful payment for credit card with invalid expiration date format @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedCreditCardNumberError = 'Invalid card number format.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.credit_card_number = '111122223333444';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.creditCardNumberError).toHaveText(
      expectedCreditCardNumberError,
    );
  });

  test('unsuccessful payment for credit card with past date value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedCreditCardNumberError = 'Invalid card number format.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.credit_card_number = '111122223333444';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.creditCardNumberError).toHaveText(
      expectedCreditCardNumberError,
    );
  });

  test('unsuccessful payment for credit card with invalid expiration date value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedExpirationDateError = 'Invalid date format. Use MM/YYYY.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.expiration_date = '!';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(
      checkoutPaymentView.expirationDateInvalidFormatError,
    ).toHaveText(expectedExpirationDateError);
  });

  test('unsuccessful payment for credit card with past expiration date value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedExpirationDateError =
      'Expiration date must be in the future.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.expiration_date = '01/2000';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.expirationDatePastError).toHaveText(
      expectedExpirationDateError,
    );
  });

  test('unsuccessful payment for credit card with invalid CVV value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedCVVError = 'CVV must be 3 or 4 digits.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.cvv = '!';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.CVVError).toHaveText(expectedCVVError);
  });

  test('unsuccessful payment for credit card with too short CVV value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedCVVError = 'CVV must be 3 or 4 digits.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.cvv = '11';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.CVVError).toHaveText(expectedCVVError);
  });

  test('unsuccessful payment for credit card with too long CVV value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Credit Card';
    const expectedCVVError = 'CVV must be 3 or 4 digits.';
    const creditCardData = prepareRandomCreditCard();
    creditCardData.payment_details.cvv = '11111';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.CVVError).toHaveText(expectedCVVError);
  });
});
