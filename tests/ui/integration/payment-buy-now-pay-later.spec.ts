import { prepareRandomBillingAddress } from '../../../src/factories/billing-address.factory';
import { expect, test } from '../../../src/fixtures/merge.fixture';

test.describe('Payment process verification for Buy Now Pay Later', () => {
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

  test('successful payment for Buy Now Pay Later @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Buy Now Pay Later';
    const monthlyInstallments = '6 Monthly Installments';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.payWithBuyNowPayLater(monthlyInstallments);
    await checkoutPaymentView.confirmPayment();

    // Assert
    await expect(checkoutPaymentView.successfulPaymentMessage).toHaveText(
      'Payment was successful',
    );
  });

  test('unsuccessful payment for Buy Now Pay Later with unselected monthly installments option @logged', async ({
    checkoutPaymentView,
  }) => {
    // Arrange
    const paymentMethod = 'Buy Now Pay Later';
    const expectedMonthlyInstallmentsError =
      'Please select the number of monthly installments.';

    // Act
    await checkoutPaymentView.selectPaymentMethod(paymentMethod);
    await checkoutPaymentView.monthlyInstallmentsDropdown.click();
    await checkoutPaymentView.monthlyInstallmentsDropdown.blur();

    // Assert
    await expect(checkoutPaymentView.monthlyInstallmentsError).toHaveText(
      expectedMonthlyInstallmentsError,
    );
  });
});
