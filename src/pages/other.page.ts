import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Page } from '@playwright/test';

export class OtherPage extends BasePage {
  url = '/category/other';
  categoryTitle = this.page.locator('[data-test="page-title"]');

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
