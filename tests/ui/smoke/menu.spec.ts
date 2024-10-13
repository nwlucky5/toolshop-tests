import { expect, test } from '@_src/ui/fixtures/merge.fixture';

test.describe('Verify menu main buttons @smoke', () => {
  test('Home link navigates to Home page', async ({
    page,
    homePage,
    loginPage,
  }) => {
    // Arrange
    const loginPageURL = loginPage.url;
    const homePageURL = homePage.url;

    // Act
    await expect.soft(page).toHaveURL(loginPageURL);
    await loginPage.mainMenu.clickHomePageLink();

    // Assert
    await expect.soft(homePage.homePageBanner).toBeVisible();
    await expect(page).toHaveURL(homePageURL);
  });

  test('Hand Tools link navigates to Hand Tools page', async ({ homePage }) => {
    // Arrange
    const expectedHandToolsPageTitle = 'Category: Hand Tools';

    // Act
    const handToolsPage = await homePage.mainMenu.clickHandToolsLink();

    // Assert
    await expect(handToolsPage.categoryTitle).toHaveText(
      expectedHandToolsPageTitle,
    );
  });

  test('Power Tools link navigates to Power Tools page', async ({
    homePage,
  }) => {
    // Arrange
    const expectedPowerToolsPageTitle = 'Category: Power Tools';

    // Act
    const powerToolsPage = await homePage.mainMenu.clickPowerToolsLink();

    // Assert
    await expect(powerToolsPage.categoryTitle).toHaveText(
      expectedPowerToolsPageTitle,
    );
  });

  test('Other link navigates to Other page', async ({ homePage }) => {
    // Arrange
    const expectedOtherPageTitle = 'Category: Other';

    // Act
    const otherPage = await homePage.mainMenu.clickOtherPageLink();

    // Assert
    await expect(otherPage.categoryTitle).toHaveText(expectedOtherPageTitle);
  });

  test('Special Tools link navigates to Special Tools page', async ({
    homePage,
  }) => {
    // Arrange
    const expectedSpecialToolsPageTitle = 'Category: Special Tools';

    // Act
    const specialToolsPage =
      await homePage.mainMenu.clickSpecialToolsPageLink();

    // Assert
    await expect(specialToolsPage.categoryTitle).toHaveText(
      expectedSpecialToolsPageTitle,
    );
  });

  test('Rentals link navigates to Rentals page', async ({ homePage }) => {
    // Arrange
    const expectedRentalsPageTitle = 'Rentals';

    // Act
    const rentalsPage = await homePage.mainMenu.clickRentalsLink();

    // Assert
    await expect(rentalsPage.categoryTitle).toHaveText(
      expectedRentalsPageTitle,
    );
  });

  test('Contact link navigates to Contact page', async ({ homePage }) => {
    // Arrange;
    const expectedContactPageTitle = 'Contact';

    // Act
    const contactPage = await homePage.mainMenu.clickContactLink();

    // Assert
    await expect(contactPage.contactTitle).toHaveText(expectedContactPageTitle);
  });

  test('Sign in link navigates to Sign in page', async ({ homePage }) => {
    // Arrange
    const expectedSignInPageTitle = 'Login';

    // Act
    const loginPage = await homePage.mainMenu.clickLoginLink();

    // Assert
    await expect(loginPage.loginTitle).toHaveText(expectedSignInPageTitle);
  });
});
