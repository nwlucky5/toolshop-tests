import { HomePage } from '../../src/pages/home.page';
import { expect, test } from '@playwright/test';

test.describe('Main pages verification', () => {
  test('Home page title', async ({ page }) => {
    // Arrange
    const expectedHomePageTitle = /Practice Software Testing - Toolshop/;

    // Act
    await page.goto('');

    // Assert
    await expect(page).toHaveTitle(expectedHomePageTitle);
  });

  test('Home link navigates to Home page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedHomePageTitle = /Practice Software Testing - Toolshop/;

    // Act
    await page.goto('/#/auth/login');
    await homePage.mainMenu.homePageLink.click();

    // Assert
    await expect(page).toHaveTitle(expectedHomePageTitle);
  });

  test('Hand Tools link navigates to Hand Tools page', async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);
    const expectedHandToolsPageTitle = 'Category: Hand Tools';

    // Act
    await page.goto('');
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
    await page.goto('');
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
    await page.goto('');
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
    await page.goto('');
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
    await page.goto('');
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
    await page.goto('');
    await await homePage.mainMenu.contactLink.click();

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
    await page.goto('');
    await homePage.mainMenu.loginPageLink.click();

    // Assert
    await expect(page.getByRole('heading', { name: 'Login' })).toHaveText(
      expectedSignInPageTitle,
    );
  });
});
