import { pageObjectTest } from '@_src/ui/fixtures/page-object.fixture';
import { productInCart } from '@_src/ui/fixtures/product-in-cart.fixture';
import { mergeTests } from '@playwright/test';

export const test = mergeTests(pageObjectTest, productInCart);

export { expect } from '@playwright/test';
