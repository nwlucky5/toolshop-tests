import { prepareRandomBillingAddress } from '../../src/factories/billing-address.factory';
import { prepareRandomBankTransfer } from '../../src/factories/payment.factory';
import { BillingAddressModel } from '../../src/models/billing-address.model';
import { HandTools } from '../../src/pages/hand-tools.page';
import { Product } from '../../src/pages/product.page';
import { CheckoutBillingAddressView } from '../../src/views/checkout-billing-address.view';
import { CheckoutCartView } from '../../src/views/checkout-cart.view';
import { CheckoutLoginView } from '../../src/views/checkout-login.view';
import { CheckoutPaymentView } from '../../src/views/checkout-payment.view';
import { expect, test } from '@playwright/test';

test.describe('Payment process verification for Bank Transfer', () => {
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

  test('successful payment for bank transfer @logged', async () => {
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

  test('unsuccessful payment for bank transfer with invalid bank name value @logged', async () => {
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

  test('unsuccessful payment for bank transfer with invalid account name value @logged', async () => {
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

  test('unsuccessful payment for bank transfer with invalid account number value @logged', async () => {
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
