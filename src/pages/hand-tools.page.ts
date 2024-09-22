import { MainMenuComponent } from '@_src/components/main-menu.component';
import { BasePage } from '@_src/pages/base.page';
import { Page } from '@playwright/test';

export class HandToolsPage extends BasePage {
  url = '/category/hand-tools';
  categoryTitle = this.page.locator('[data-test="page-title"]');
  firstProduct = this.page.getByText('Combination Pliers');
  productOutOfStock = this.page.getByText('Out of stock');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
