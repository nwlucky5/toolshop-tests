import { CheckoutPage } from '../pages/checkout.page';
import { ContactPage } from '../pages/contact.page';
import { HandToolsPage } from '../pages/hand-tools.page';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { OtherPage } from '../pages/other.page';
import { PowerToolsPage } from '../pages/power-tools.page';
import { RentalsPage } from '../pages/rentals.page';
import { SpecialToolsPage } from '../pages/special-tools.page';
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

  async clickHomePageLink(): Promise<HomePage> {
    await this.homePageLink.click();
    return new HomePage(this.page);
  }

  async clickHandToolsLink(): Promise<HandToolsPage> {
    await this.categorySubmenu.click();
    await this.handToolsLink.click();
    return new HandToolsPage(this.page);
  }

  async clickPowerToolsLink(): Promise<PowerToolsPage> {
    await this.categorySubmenu.click();
    await this.powerToolsLink.click();
    return new PowerToolsPage(this.page);
  }

  async clickOtherPageLink(): Promise<OtherPage> {
    await this.categorySubmenu.click();
    await this.otherPageLink.click();
    return new OtherPage(this.page);
  }

  async clickSpecialToolsPageLink(): Promise<SpecialToolsPage> {
    await this.categorySubmenu.click();
    await this.specialToolsPageLink.click();
    return new SpecialToolsPage(this.page);
  }

  async clickRentalsLink(): Promise<RentalsPage> {
    await this.categorySubmenu.click();
    await this.rentalsPageLink.click();
    return new RentalsPage(this.page);
  }

  async clickContactLink(): Promise<ContactPage> {
    await this.contactLink.click();
    return new ContactPage(this.page);
  }

  async clickLoginLink(): Promise<LoginPage> {
    await this.loginPageLink.click();
    return new LoginPage(this.page);
  }

  async clickShoppingCartIcon(): Promise<CheckoutPage> {
    await this.shoppingCartIcon.click();
    return new CheckoutPage(this.page);
  }
}
