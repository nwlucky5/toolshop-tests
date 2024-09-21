import { MainMenuComponent } from '../components/main-menu.component';
import { BasePage } from './base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '';
  homePageBanner = this.page.getByRole('img', { name: 'Banner' });

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
