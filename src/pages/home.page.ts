import { BasePage } from './base.page';
import { MainMenuComponent } from '@_src/components/main-menu.component';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '';
  homePageBanner = this.page.getByRole('img', { name: 'Banner' });

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
