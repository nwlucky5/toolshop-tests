import { BillingAddressModel } from '../models/billing-address.model';
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

  async verifyBillingAddress(
    billingAddressData: BillingAddressModel,
  ): Promise<void> {
    const addressInputValue = await this.addressInput.inputValue();
    if (addressInputValue.trim() !== '') {
      await this.addressInput.fill(billingAddressData.address);
    }

    const cityInputValue = await this.cityInput.inputValue();
    if (cityInputValue.trim() !== '') {
      await this.cityInput.fill(billingAddressData.city);
    }

    const stateInputValue = await this.stateInput.inputValue();
    if (stateInputValue.trim() !== '') {
      await this.stateInput.fill(billingAddressData.state);
    }

    const countryInputValue = await this.countryInput.inputValue();
    if (countryInputValue.trim() !== '') {
      await this.countryInput.fill(billingAddressData.country);
    }

    const postcodeInputValue = await this.postcodeInput.inputValue();
    if (postcodeInputValue.trim() !== '') {
      await this.postcodeInput.fill(billingAddressData.postcode);
    }

    await this.proceedToCheckoutButton.click();
  }
}
