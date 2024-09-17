import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class SpecialToolsPage {
  url = '/category/special-tools';
  categoryTitle = this.page.locator('[data-test="page-title"]');

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
