import { STORAGE_STATE } from '../../playwright.config';
import { AccountPage } from '../../src/pages/account.page';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/test.data';
import { expect, test } from '@playwright/test';

test('Login with correct credentials', async ({ page }) => {
  // Arrange
  const loginPage = new LoginPage(page);
  const accountPage = new AccountPage(page);
  await loginPage.goto();

  // Act
  await loginPage.login(testUser1);

  // Assert
  await expect(page).toHaveURL(accountPage.url);
  await page.context().storageState({ path: STORAGE_STATE });
});
