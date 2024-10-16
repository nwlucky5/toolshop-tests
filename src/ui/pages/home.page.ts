import { MainMenuComponent } from '@_src/ui/components/main-menu.component';
import { BasePage } from '@_src/ui/pages/base.page';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  url = '';
  homePageBanner = this.page.getByRole('img', { name: 'Banner' });

  constructor(page: Page) {
    super(page);
  }

  mainMenu = new MainMenuComponent(this.page);
}
