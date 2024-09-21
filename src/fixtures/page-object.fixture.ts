import { AccountPage } from '../../src/pages/account.page';
import { ContactPage } from '../../src/pages/contact.page';
import { HandToolsPage } from '../../src/pages/hand-tools.page';
import { HomePage } from '../../src/pages/home.page';
import { LoginPage } from '../../src/pages/login.page';
import { OtherPage } from '../../src/pages/other.page';
import { PowerToolsPage } from '../../src/pages/power-tools.page';
import { ProductPage } from '../../src/pages/product.page';
import { RegisterPage } from '../../src/pages/register.page';
import { RentalsPage } from '../../src/pages/rentals.page';
import { SpecialToolsPage } from '../../src/pages/special-tools.page';
import { CheckoutBillingAddressView } from '../../src/views/checkout-billing-address.view';
import { CheckoutPage } from '../pages/checkout.page';
import { CheckoutCartView } from '../views/checkout-cart.view';
import { CheckoutLoginView } from '../views/checkout-login.view';
import { CheckoutPaymentView } from '../views/checkout-payment.view';
import { test as baseTest } from '@playwright/test';

interface Pages {
  homePage: HomePage;
  handToolsPage: HandToolsPage;
  powerToolsPage: PowerToolsPage;
  otherPage: OtherPage;
  specialToolsPage: SpecialToolsPage;
  rentalsPage: RentalsPage;
  contactPage: ContactPage;
  loginPage: LoginPage;
  productPage: ProductPage;
  accountPage: AccountPage;
  registerPage: RegisterPage;
  checkoutPage: CheckoutPage;
  checkoutBillingAddressView: CheckoutBillingAddressView;
  checkoutCartView: CheckoutCartView;
  checkoutLoginView: CheckoutLoginView;
  checkoutPaymentView: CheckoutPaymentView;
}

export const pageObjectTest = baseTest.extend<Pages>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  handToolsPage: async ({ page }, use) => {
    const handToolsPage = new HandToolsPage(page);
    await handToolsPage.goto();
    await use(handToolsPage);
  },
  powerToolsPage: async ({ page }, use) => {
    const powerToolsPage = new PowerToolsPage(page);
    await powerToolsPage.goto();
    await use(powerToolsPage);
  },
  otherPage: async ({ page }, use) => {
    const otherPage = new OtherPage(page);
    await otherPage.goto();
    await use(otherPage);
  },
  specialToolsPage: async ({ page }, use) => {
    const specialToolsPage = new SpecialToolsPage(page);
    await specialToolsPage.goto();
    await use(specialToolsPage);
  },
  rentalsPage: async ({ page }, use) => {
    const rentalsPage = new RentalsPage(page);
    await rentalsPage.goto();
    await use(rentalsPage);
  },
  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto();
    await use(contactPage);
  },
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await use(registerPage);
  },
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  accountPage: async ({ page }, use) => {
    const accountPage = new AccountPage(page);
    await accountPage.goto();
    await use(accountPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await use(checkoutPage);
  },
  checkoutBillingAddressView: async ({ page }, use) => {
    const checkoutBillingAddressView = new CheckoutBillingAddressView(page);
    await use(checkoutBillingAddressView);
  },
  checkoutCartView: async ({ page }, use) => {
    const checkoutCartView = new CheckoutCartView(page);
    await use(checkoutCartView);
  },
  checkoutLoginView: async ({ page }, use) => {
    const checkoutLoginView = new CheckoutLoginView(page);
    await use(checkoutLoginView);
  },
  checkoutPaymentView: async ({ page }, use) => {
    const checkoutPaymentView = new CheckoutPaymentView(page);
    await use(checkoutPaymentView);
  },
});
