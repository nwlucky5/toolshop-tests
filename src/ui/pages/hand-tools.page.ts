import { MainMenuComponent } from '@_src/ui/components/main-menu.component';
import { BasePage } from '@_src/ui/pages/base.page';
import { Page } from '@playwright/test';

export class HandToolsPage extends BasePage {
  url = '/category/hand-tools';
  categoryTitle = this.page.locator('[data-test="page-title"]');
  firstProduct = this.page
    .locator('.container')
    .locator('.card')
    .locator('.card-title')
    .first();
  productOutOfStock = this.page.getByText('Out of stock');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
