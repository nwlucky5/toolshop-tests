import { Page } from '@playwright/test';

export class MainMenuComponent {
  constructor(private page: Page) {}

  homePageLink = this.page.locator('[data-test="nav-home"]');
  categorySubmenu = this.page.locator('[data-test="nav-categories"]');
  handToolsLink = this.page.locator('[data-test="nav-hand-tools"]');
  powerToolsLink = this.page.locator('[data-test="nav-power-tools"]');
  otherPageLink = this.page.locator('[data-test="nav-other"]');
  specialToolsPageLink = this.page.locator('[data-test="nav-special-tools"]');
  rentalsPageLink = this.page.locator('[data-test="nav-rentals"]');
  contactLink = this.page.locator('[data-test="nav-contact"]');
  loginPageLink = this.page.locator('[data-test="nav-sign-in"]');
}
