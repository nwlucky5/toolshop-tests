import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class LoginPage {
  url = '/#/auth/login';

  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }
}
