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
    const expectedHomePageTitle = /Practice Software Testing - Toolshop/;

    // Act
    await page.goto('/#/auth/login');
    await page.locator('[data-test="nav-home"]').click();

    // Assert
    await expect(page).toHaveTitle(expectedHomePageTitle);
  });

  test('Hand Tools link navigates to Hand Tools page', async ({ page }) => {
    // Arrange
    const expectedHandToolsPageTitle = 'Category: Hand Tools';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-categories"]').click();
    await page.locator('[data-test="nav-hand-tools"]').click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedHandToolsPageTitle,
    );
  });

  test('Power Tools link navigates to Power Tools page', async ({ page }) => {
    // Arrange
    const expectedPowerToolsPageTitle = 'Category: Power Tools';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-categories"]').click();
    await page.locator('[data-test="nav-power-tools"]').click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedPowerToolsPageTitle,
    );
  });

  test('Other link navigates to Other page', async ({ page }) => {
    // Arrange
    const expectedOtherPageTitle = 'Category: Other';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-categories"]').click();
    await page.locator('[data-test="nav-other"]').click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedOtherPageTitle,
    );
  });

  test('Special Tools link navigates to Special Tools page', async ({
    page,
  }) => {
    // Arrange
    const expectedSpecialToolsPageTitle = 'Category: Special Tools';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-categories"]').click();
    await page.locator('[data-test="nav-special-tools"]').click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedSpecialToolsPageTitle,
    );
  });

  test('Rentals link navigates to Rentals page', async ({ page }) => {
    // Arrange
    const expectedRentalsPageTitle = 'Rentals';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-categories"]').click();
    await page.locator('[data-test="nav-rentals"]').click();

    // Assert
    await expect(page.locator('[data-test="page-title"]')).toHaveText(
      expectedRentalsPageTitle,
    );
  });

  test('Contact link navigates to Contact page', async ({ page }) => {
    // Arrange
    const expectedContactPageTitle = 'Contact';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-contact"]').click();

    // Assert
    await expect(page.getByRole('heading', { name: 'Contact' })).toHaveText(
      expectedContactPageTitle,
    );
  });

  test('Sign in link navigates to Sign in page', async ({ page }) => {
    // Arrange
    const expectedSignInPageTitle = 'Login';

    // Act
    await page.goto('');
    await page.locator('[data-test="nav-sign-in"]').click();

    // Assert
    await expect(page.getByRole('heading', { name: 'Login' })).toHaveText(
      expectedSignInPageTitle,
    );
  });
});
