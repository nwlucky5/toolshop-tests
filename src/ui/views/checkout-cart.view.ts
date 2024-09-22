import { Page } from '@playwright/test';

export class CheckoutCartView {
  proceedToCheckoutButton = this.page.locator('[data-test="proceed-1"]');

  constructor(private page: Page) {}
}
