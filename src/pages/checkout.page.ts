import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class CheckoutPage {
  url = '/checkout';
  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
