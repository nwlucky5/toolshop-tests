import { HomePage } from '../../src/pages/home.page';
import { LoginPage } from '../../src/pages/login.page';
import { expect, test } from '@playwright/test';

test.describe('Main pages verification', () => {
  test('Page title', async ({ page }) => {
    // Arrange
    const expectedPageTitle = /Practice Software Testing - Toolshop/;
    const homePage = new HomePage(page);

    // Act
    await homePage.goto();

    // Assert
    await expect(page).toHaveTitle(expectedPageTitle);
  });

  test('Home link navigates to Home page', async ({ page }) => {
    // Arrange
    const homePageURL = 'https://practicesoftwaretesting.com/#/';
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();
    await homePage.mainMenu.homePageLink.click();

    // Assert
    await expect.soft(homePage.homePageBanner).toBeVisible();
    await expect(page).toHaveURL(homePageURL);
  });

  test('Hand Tools link navigates to Hand Tools page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedHandToolsPageTitle = 'Category: Hand Tools';

    // Act
    await homePage.goto();
    await homePage.mainMenu.categorySubmenu.click();
    await homePage.mainMenu.handToolsLink.click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedHandToolsPageTitle,
    );
  });

  test('Power Tools link navigates to Power Tools page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedPowerToolsPageTitle = 'Category: Power Tools';

    // Act
    await homePage.goto();
    await homePage.mainMenu.categorySubmenu.click();
    await homePage.mainMenu.powerToolsLink.click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedPowerToolsPageTitle,
    );
  });

  test('Other link navigates to Other page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedOtherPageTitle = 'Category: Other';

    // Act
    await homePage.goto();
    await homePage.mainMenu.categorySubmenu.click();
    await homePage.mainMenu.otherPageLink.click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedOtherPageTitle,
    );
  });

  test('Special Tools link navigates to Special Tools page', async ({
    page,
  }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedSpecialToolsPageTitle = 'Category: Special Tools';

    // Act
    await homePage.goto();
    await homePage.mainMenu.categorySubmenu.click();
    await homePage.mainMenu.specialToolsPageLink.click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedSpecialToolsPageTitle,
    );
  });

  test('Rentals link navigates to Rentals page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedRentalsPageTitle = 'Rentals';

    // Act
    await homePage.goto();
    await homePage.mainMenu.categorySubmenu.click();
    await homePage.mainMenu.rentalsPageLink.click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedRentalsPageTitle,
    );
  });

  test('Contact link navigates to Contact page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedContactPageTitle = 'Contact';

    // Act
    await homePage.goto();
    await homePage.mainMenu.contactLink.click();

    // Assert
    await expect(page.getByRole('heading', { name: 'Contact' })).toHaveText(
      expectedContactPageTitle,
    );
  });

  test('Sign in link navigates to Sign in page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedSignInPageTitle = 'Login';

    // Act
    await homePage.goto();
    await homePage.mainMenu.loginPageLink.click();

    // Assert
    await expect(page.getByRole('heading', { name: 'Login' })).toHaveText(
      expectedSignInPageTitle,
    );
  });
});
