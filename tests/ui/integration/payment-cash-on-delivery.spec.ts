import { prepareRandomBillingAddress } from '../../../src/factories/billing-address.factory';
import { expect, test } from '../../../src/fixtures/merge.fixture';

test.describe('Payment process verification for Cash on Delivery', () => {
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

  test('successful payment with cash on delivery @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Cash on Delivery';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.confirmPayment();

    // Assert
    await expect(checkoutPaymentView.successfulPaymentMessage).toHaveText(
      'Payment was successful',
    );
  });
});
