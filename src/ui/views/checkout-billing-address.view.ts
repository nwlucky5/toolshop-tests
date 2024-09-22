import { BillingAddressModel } from '@_src/ui/models/billing-address.model';
import { Page } from '@playwright/test';

export class CheckoutBillingAddressView {
  billingAddressTitle = this.page.getByRole('heading', {
    name: 'Billing Address',
  });
  addressInput = this.page.locator('[data-test="address"]');
  cityInput = this.page.locator('[data-test="city"]');
  stateInput = this.page.locator('[data-test="state"]');
  countryInput = this.page.locator('[data-test="country"]');
  postcodeInput = this.page.locator('[data-test="postcode"]');
  proceedToCheckoutButton = this.page.locator('[data-test="proceed-3"]');
  paymentTitle = this.page.getByRole('heading', { name: 'Payment' });

  constructor(private page: Page) {}

  async fillBillingAddress(
    billingAddressData: BillingAddressModel,
  ): Promise<void> {
    await this.addressInput.fill(billingAddressData.address);
    await this.addressInput.blur();
    await this.cityInput.fill(billingAddressData.city);
    await this.cityInput.blur();
    await this.stateInput.fill(billingAddressData.state);
    await this.stateInput.blur();
    await this.countryInput.fill(billingAddressData.country);
    await this.countryInput.blur();
    await this.postcodeInput.fill(billingAddressData.postcode);
    await this.postcodeInput.blur();
    await this.proceedToCheckoutButton.click();
  }
}
