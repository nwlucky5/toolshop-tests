import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class RentalsPage {
  url = '/category/rentals';
  categoryTitle = this.page.locator('[data-test="page-title"]');

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
