import { prepareRandomBillingAddress } from '../../../src/factories/billing-address.factory';
import { prepareRandomCreditCard } from '../../../src/factories/payment.factory';
import { CheckoutPage } from '../../../src/pages/checkout.page';
import { HandToolsPage } from '../../../src/pages/hand-tools.page';
import { Product } from '../../../src/pages/product.page';
import { testUser1 } from '../../../src/test-data/test.data';
import { CheckoutBillingAddressView } from '../../../src/views/checkout-billing-address.view';
import { CheckoutCartView } from '../../../src/views/checkout-cart.view';
import { CheckoutLoginView } from '../../../src/views/checkout-login.view';
import { CheckoutPaymentView } from '../../../src/views/checkout-payment.view';
import { expect, test } from '@playwright/test';

test.describe('Checkout process verification', () => {
  let handToolsPage: HandToolsPage;
  let productPage: Product;
  let checkoutPage: CheckoutPage;
  let checkoutCartView: CheckoutCartView;
  // let loginPage: LoginPage;
  let checkoutLoginView: CheckoutLoginView;
  let checkoutBillingAddressView: CheckoutBillingAddressView;
  let checkoutPaymentView: CheckoutPaymentView;

  test.beforeEach(async ({ page }) => {
    handToolsPage = new HandToolsPage(page);
    productPage = new Product(page);
    checkoutPage = new CheckoutPage(page);
    checkoutCartView = new CheckoutCartView(page);
    // loginPage = new LoginPage(page);
    checkoutLoginView = new CheckoutLoginView(page);
    checkoutBillingAddressView = new CheckoutBillingAddressView(page);
    checkoutPaymentView = new CheckoutPaymentView(page);

    await handToolsPage.goto();
    await handToolsPage.firstProduct.click();
    await productPage.addToCart();
    await expect(productPage.notificationMessageText).toBeVisible();
  });

  test('successful checkout for logged user @logged', async ({ page }) => {
    await test.step('proceed to checkout', async () => {
      // Act
      await productPage.mainMenu.shoppingCartIcon.click();

      // Assert
      await expect.soft(page).toHaveURL(checkoutPage.url);
    });

    await test.step('proceed to login view', async () => {
      //Arrange
      const expectedUsername = 'Jack Howe';
      const expectedSignedInUserMessage = `Hello ${expectedUsername}, you are already logged in. You can proceed to checkout.`;

      // Act
      await checkoutCartView.proceedToCheckoutButton.click();

      // Assert
      await expect(checkoutLoginView.signedInUserMessage).toHaveText(
        expectedSignedInUserMessage,
      );
    });

    //test step 3
    await test.step('proceed to billing address view', async () => {
      //Arrange
      const expectedBillingAddressTitle = 'Billing Address';
      const expectedPaymentTitle = 'Payment';
      const billingAddressData = prepareRandomBillingAddress();

      // Act
      await checkoutLoginView.proceedToCheckoutButton.click();
      await expect
        .soft(checkoutBillingAddressView.billingAddressTitle)
        .toHaveText(expectedBillingAddressTitle);
      await expect
        .soft(checkoutBillingAddressView.proceedToCheckoutButton)
        .toBeDisabled();
      await expect(async () => {
        await page.waitForLoadState();
        await checkoutBillingAddressView.fillBillingAddress(billingAddressData);

        await expect
          .soft(checkoutBillingAddressView.paymentTitle)
          .toHaveText(expectedPaymentTitle);
      }).toPass({ timeout: 10_000 });
    });

    await test.step('proceed to billing payment view', async () => {
      //Arrange
      const paymentMethod = 'Credit Card';
      const creditCardData = prepareRandomCreditCard();

      await checkoutPaymentView.selectPaymentMethod(paymentMethod);
      await checkoutPaymentView.payWithCreditCard(creditCardData);

      await expect(checkoutPaymentView.successfulPaymentMessage).toHaveText(
        'Payment was successful',
      );
    });
  });

  test('successful checkout for registered non-logged user', async ({
    page,
  }) => {
    await test.step('proceed to checkout', async () => {
      // Act
      await productPage.mainMenu.shoppingCartIcon.click();

      // Assert
      await expect.soft(page).toHaveURL(checkoutPage.url);
    });

    await test.step('proceed to login view', async () => {
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

    //test step 3
    await test.step('proceed to billing address view', async () => {
      //Arrange
      const expectedBillingAddressTitle = 'Billing Address';
      const expectedPaymentTitle = 'Payment';
      const billingAddressData = prepareRandomBillingAddress();

      // Act
      await checkoutLoginView.proceedToCheckoutButton.click();
      await expect
        .soft(checkoutBillingAddressView.billingAddressTitle)
        .toHaveText(expectedBillingAddressTitle);
      await expect
        .soft(checkoutBillingAddressView.proceedToCheckoutButton)
        .toBeDisabled();
      await expect(async () => {
        await page.waitForLoadState();
        await checkoutBillingAddressView.fillBillingAddress(billingAddressData);

        await expect
          .soft(checkoutBillingAddressView.paymentTitle)
          .toHaveText(expectedPaymentTitle);
      }).toPass({ timeout: 10_000 });
    });

    await test.step('proceed to billing payment view', async () => {
      //Arrange
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
