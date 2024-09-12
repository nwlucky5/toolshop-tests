import { CategoryPage } from '../../../src/pages/category.page';
import { ContactPage } from '../../../src/pages/contact.page';
import { HomePage } from '../../../src/pages/home.page';
import { LoginPage } from '../../../src/pages/login.page';
import { expect, test } from '@playwright/test';

test.describe('Main pages verification', () => {
  let homePage: HomePage;
  let categoryPage: CategoryPage;
  let contactPage: ContactPage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    contactPage = new ContactPage(page);
    loginPage = new LoginPage(page);

    await homePage.goto();
  });

  test('Page title', async ({ page }) => {
    // Arrange
    const expectedPageTitle = /Practice Software Testing - Toolshop/;

    // Assert
    await expect(page).toHaveTitle(expectedPageTitle);
  });

  test('Home link navigates to Home page', async ({ page }) => {
    // Arrange
    const homePageURL = homePage.url;
    const loginPageURL = loginPage.url;

    // Act
    await loginPage.goto();
    await expect.soft(page).toHaveURL(loginPageURL);
    await loginPage.mainMenu.clickHomePageLink();

    // Assert
    await expect.soft(homePage.homePageBanner).toBeVisible();
    await expect(page).toHaveURL(homePageURL);
  });

  test('Hand Tools link navigates to Hand Tools page', async () => {
    // Arrange
    const expectedHandToolsPageTitle = 'Category: Hand Tools';

    // Act
    await homePage.mainMenu.clickHandToolsLink();

    // Assert
    await expect(categoryPage.categoryTitle).toHaveText(
      expectedHandToolsPageTitle,
    );
  });

  test('Power Tools link navigates to Power Tools page', async () => {
    // Arrange
    const expectedPowerToolsPageTitle = 'Category: Power Tools';

    // Act
    await homePage.mainMenu.clickPowerToolsLink();

    // Assert
    await expect(categoryPage.categoryTitle).toHaveText(
      expectedPowerToolsPageTitle,
    );
  });

  test('Other link navigates to Other page', async () => {
    // Arrange
    const expectedOtherPageTitle = 'Category: Other';

    // Act
    await homePage.mainMenu.clickOtherPageLink();

    // Assert
    await expect(categoryPage.categoryTitle).toHaveText(expectedOtherPageTitle);
  });

  test('Special Tools link navigates to Special Tools page', async () => {
    // Arrange
    const expectedSpecialToolsPageTitle = 'Category: Special Tools';

    // Act
    await homePage.mainMenu.clickSpecialToolsPageLink();

    // Assert
    await expect(categoryPage.categoryTitle).toHaveText(
      expectedSpecialToolsPageTitle,
    );
  });

  test('Rentals link navigates to Rentals page', async () => {
    // Arrange
    const expectedRentalsPageTitle = 'Rentals';

    // Act
    await homePage.mainMenu.clickRentalsLink();

    // Assert
    await expect(categoryPage.categoryTitle).toHaveText(
      expectedRentalsPageTitle,
    );
  });

  test('Contact link navigates to Contact page', async () => {
    // Arrange;
    const expectedContactPageTitle = 'Contact';

    // Act
    await homePage.mainMenu.clickContactLink();

    // Assert
    await expect(contactPage.contactTitle).toHaveText(expectedContactPageTitle);
  });

  test('Sign in link navigates to Sign in page', async () => {
    // Arrange
    const expectedSignInPageTitle = 'Login';

    // Act
    await homePage.mainMenu.clickLoginLink();

    // Assert
    await expect(loginPage.loginTitle).toHaveText(expectedSignInPageTitle);
  });
});
