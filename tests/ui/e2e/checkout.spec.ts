import { prepareRandomBillingAddress } from '../../../src/factories/billing-address.factory';
import { prepareRandomCreditCard } from '../../../src/factories/payment.factory';
import { expect, test } from '../../../src/fixtures/merge.fixture';
import { testUser1 } from '../../../src/test-data/test.data';

test.describe('Checkout process verification', () => {
  test('successful checkout for logged user @logged', async ({
    page,
    checkoutPage,
    checkoutCartView,
    checkoutLoginView,
    checkoutBillingAddressView,
    checkoutPaymentView,
    addProductToCart,
  }) => {
    await test.step('proceed to checkout', async () => {
      // Arrange
      const productPage = addProductToCart.productPage;

      // Act
      await productPage.mainMenu.shoppingCartIcon.click();

      // Assert
      await expect(page).toHaveURL(checkoutPage.url);
    });

    await test.step('proceed to login', async () => {
      // Arrange
      const expectedUsername = 'Jack Howe';
      const expectedSignedInUserMessage = `Hello ${expectedUsername}, you are already logged in. You can proceed to checkout.`;

      // Act
      await checkoutCartView.proceedToCheckoutButton.click();

      // Assert
      await expect(checkoutLoginView.signedInUserMessage).toHaveText(
        expectedSignedInUserMessage,
      );
    });

    await test.step('proceed to billing address', async () => {
      // Arrange
      const expectedBillingAddressTitle = 'Billing Address';

      // Act
      await checkoutLoginView.proceedToCheckoutButton.click();

      // Assert
      await expect(checkoutBillingAddressView.billingAddressTitle).toHaveText(
        expectedBillingAddressTitle,
      );
    });

    await test.step('proceed to payment', async () => {
      // Arrange
      const expectedPaymentTitle = 'Payment';
      const billingAddressData = prepareRandomBillingAddress();

      // Act
      await checkoutBillingAddressView.fillBillingAddress(billingAddressData);

      // Assert
      await expect(async () => {
        await expect(checkoutBillingAddressView.paymentTitle).toHaveText(
          expectedPaymentTitle,
        );
      }).toPass({ timeout: 10_000 });
    });

    await test.step('confirm payment', async () => {
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
  });

  test('successful checkout for registered non-logged user', async ({
    page,
    checkoutPage,
    checkoutCartView,
    checkoutLoginView,
    checkoutBillingAddressView,
    checkoutPaymentView,
    addProductToCart,
  }) => {
    await test.step('proceed to checkout', async () => {
      // Arrange
      const productPage = addProductToCart.productPage;

      // Act
      await productPage.mainMenu.shoppingCartIcon.click();

      // Assert
      await expect(page).toHaveURL(checkoutPage.url);
    });

    await test.step('proceed to login', async () => {
      //Arrange
      const expectedSignInViewTitle = 'Login';
      const expectedUsername = 'Jack Howe';
      const expectedSignedInUserMessage = `Hello ${expectedUsername}, you are already logged in. You can proceed to checkout.`;

      // Act
      await checkoutCartView.proceedToCheckoutButton.click();
      await expect
        .soft(checkoutLoginView.loginTitle)
        .toHaveText(expectedSignInViewTitle);
      await checkoutLoginView.login(testUser1);

      // Assert
      await expect(checkoutLoginView.signedInUserMessage).toHaveText(
        expectedSignedInUserMessage,
      );
    });

    await test.step('proceed to billing address', async () => {
      // Arrange
      const expectedBillingAddressTitle = 'Billing Address';

      // Act
      await checkoutLoginView.proceedToCheckoutButton.click();

      // Assert
      await expect(checkoutBillingAddressView.billingAddressTitle).toHaveText(
        expectedBillingAddressTitle,
      );
    });

    await test.step('proceed to payment', async () => {
      // Arrange
      const expectedPaymentTitle = 'Payment';
      const billingAddressData = prepareRandomBillingAddress();

      // Act
      await checkoutBillingAddressView.fillBillingAddress(billingAddressData);

      // Assert
      await expect(async () => {
        await expect(checkoutBillingAddressView.paymentTitle).toHaveText(
          expectedPaymentTitle,
        );
      }).toPass({ timeout: 10_000 });
    });

    await test.step('confirm payment', async () => {
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
  });
});
