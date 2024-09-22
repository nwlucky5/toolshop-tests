import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Page } from '@playwright/test';

export class CheckoutPage extends BasePage {
  url = '/checkout';

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
