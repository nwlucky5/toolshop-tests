import { prepareRandomBillingAddress } from '@_src/ui/factories/billing-address.factory';
import { prepareRandomCreditCard } from '@_src/ui/factories/payment.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';

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
    creditCardData.paymentDetails.creditCardNumber = '111122223333444';

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
    creditCardData.paymentDetails.creditCardNumber = '111122223333444';

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
    creditCardData.paymentDetails.creditCardNumber = '111122223333444';

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
    creditCardData.paymentDetails.expirationDate = '!';

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
    creditCardData.paymentDetails.expirationDate = '01/2000';

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
    creditCardData.paymentDetails.cvv = '!';

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
    creditCardData.paymentDetails.cvv = '11';

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
    creditCardData.paymentDetails.cvv = '11111';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithCreditCard(creditCardData);

    // Assert
    await expect(checkoutPaymentView.CVVError).toHaveText(expectedCVVError);
  });
});
