import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class HandTools {
  url = '/category/hand-tools';
  firstProduct = this.page.getByText('Combination Pliers');
  productOutOfStock = this.page.getByText('Out of stock');

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
