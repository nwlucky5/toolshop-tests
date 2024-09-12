import { Page } from '@playwright/test';

export class MainMenuComponent {
  homePageLink = this.page.locator('[data-test="nav-home"]');
  categorySubmenu = this.page.locator('[data-test="nav-categories"]');
  handToolsLink = this.page.locator('[data-test="nav-hand-tools"]');
  powerToolsLink = this.page.locator('[data-test="nav-power-tools"]');
  otherPageLink = this.page.locator('[data-test="nav-other"]');
  specialToolsPageLink = this.page.locator('[data-test="nav-special-tools"]');
  rentalsPageLink = this.page.locator('[data-test="nav-rentals"]');
  contactLink = this.page.locator('[data-test="nav-contact"]');
  loginPageLink = this.page.locator('[data-test="nav-sign-in"]');
  shoppingCartIcon = this.page.locator('[data-test="nav-cart"]');
  userSubmenu = this.page.locator('[data-test="nav-menu"]');

  constructor(private page: Page) {}

  async clickHomePageLink(): Promise<void> {
    await this.homePageLink.click();
  }

  async clickHandToolsLink(): Promise<void> {
    await this.categorySubmenu.click();
    await this.handToolsLink.click();
  }

  async clickPowerToolsLink(): Promise<void> {
    await this.categorySubmenu.click();
    await this.powerToolsLink.click();
  }

  async clickOtherPageLink(): Promise<void> {
    await this.categorySubmenu.click();
    await this.otherPageLink.click();
  }

  async clickSpecialToolsPageLink(): Promise<void> {
    await this.categorySubmenu.click();
    await this.specialToolsPageLink.click();
  }

  async clickRentalsLink(): Promise<void> {
    await this.categorySubmenu.click();
    await this.rentalsPageLink.click();
  }

  async clickContactLink(): Promise<void> {
    await this.contactLink.click();
  }

  async clickLoginLink(): Promise<void> {
    await this.loginPageLink.click();
  }

  async clickShoppingCartIcon(): Promise<void> {
    await this.shoppingCartIcon.click();
  }
}
