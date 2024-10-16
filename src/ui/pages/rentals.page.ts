import { MainMenuComponent } from '@_src/ui/components/main-menu.component';
import { BasePage } from '@_src/ui/pages/base.page';
import { Page } from '@playwright/test';

export class RentalsPage extends BasePage {
  url = '/category/rentals';
  categoryTitle = this.page.locator('[data-test="page-title"]');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
