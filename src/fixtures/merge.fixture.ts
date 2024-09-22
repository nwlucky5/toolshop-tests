import { pageObjectTest } from '@_src/fixtures/page-object.fixture';
import { productInCart } from '@_src/fixtures/product-in-cart.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, productInCart);

export { expect } from '@playwright/test';
