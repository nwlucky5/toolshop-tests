import { MainMenuComponent } from '../components/main-menu.component';
import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  mainMenu = new MainMenuComponent(this.page);
}
