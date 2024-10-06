import { prepareRandomBillingAddress } from '@_src/ui/factories/billing-address.factory';
import { prepareRandomGiftCard } from '@_src/ui/factories/payment.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';

test.describe('Payment process verification for Gift Card', () => {
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

  test('successful payment for gift card @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Gift Card';
    const giftCardData = prepareRandomGiftCard();

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithGiftCard(giftCardData);
    await checkoutPaymentView.confirmPayment();

    // Assert
    await expect(checkoutPaymentView.successfulPaymentMessage).toHaveText(
      'Payment was successful',
    );
  });

  test('unsuccessful payment for gift card with invalid gift card number value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Gift Card';
    const expectedGiftCardNumberError =
      'Gift card number must be alphanumeric.';
    const giftCardData = prepareRandomGiftCard();
    giftCardData.paymentDetails.giftCardNumber = '!';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithGiftCard(giftCardData);

    // Assert
    await expect(checkoutPaymentView.giftNardNumberError).toHaveText(
      expectedGiftCardNumberError,
    );
  });

  test('unsuccessful payment for gift card with invalid validation code value @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Gift Card';
    const expectedValidationCodeError = 'Validation code must be alphanumeric.';
    const giftCardData = prepareRandomGiftCard();
    giftCardData.paymentDetails.validationCode = '!';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithGiftCard(giftCardData);

    // Assert
    await expect(checkoutPaymentView.validationCodeError).toHaveText(
      expectedValidationCodeError,
    );
  });
});
