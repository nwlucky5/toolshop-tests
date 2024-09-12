import { BillingAddressModel } from '../models/billing-address.model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomBillingAddress(): BillingAddressModel {
  const billingAddressData: BillingAddressModel = {
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
  };

  return billingAddressData;
}
