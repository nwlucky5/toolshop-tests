import { prepareRandomBillingAddress } from '../../src/factories/billing-address.factory';
import { BillingAddressModel } from '../../src/models/billing-address.model';
import { HandTools } from '../../src/pages/hand-tools.page';
import { Product } from '../../src/pages/product.page';
import { CheckoutBillingAddressView } from '../../src/views/checkout-billing-address.view';
import { CheckoutCartView } from '../../src/views/checkout-cart.view';
import { CheckoutLoginView } from '../../src/views/checkout-login.view';
import { CheckoutPaymentView } from '../../src/views/checkout-payment.view';
import { expect, test } from '@playwright/test';

test.describe('Payment process verification for Cash on Delivery', () => {
  let handToolsPage: HandTools;
  let productPage: Product;
  let checkoutCartView: CheckoutCartView;
  let checkoutLoginView: CheckoutLoginView;
  let checkoutBillingAddressView: CheckoutBillingAddressView;
  let checkoutPaymentView: CheckoutPaymentView;
  let billingAddressData: BillingAddressModel;

  test.beforeEach(async ({ page }) => {
    handToolsPage = new HandTools(page);
    productPage = new Product(page);
    checkoutCartView = new CheckoutCartView(page);
    checkoutLoginView = new CheckoutLoginView(page);
    checkoutBillingAddressView = new CheckoutBillingAddressView(page);
    checkoutPaymentView = new CheckoutPaymentView(page);
    billingAddressData = prepareRandomBillingAddress();

    await handToolsPage.goto();
    await handToolsPage.firstProduct.click();
    await productPage.addToCart();
    await productPage.mainMenu.shoppingCartIcon.click();
    await checkoutCartView.proceedToCheckoutButton.click();
    await checkoutLoginView.proceedToCheckoutButton.click();
    await checkoutBillingAddressView.fillBillingAddress(billingAddressData);
  });

  test('successful payment with cash on delivery @logged', async () => {
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
