import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Page } from '@playwright/test';

export class CategoryPage {
  categoryTitle = this.page.locator('[data-test="page-title"]');

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);
}
