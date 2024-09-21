import { STORAGE_STATE } from '../../playwright.config';
import { expect, test } from '../../src/fixtures/merge.fixture';
import { testUser1 } from '../../src/test-data/test.data';

test('Login with correct credentials', async ({
  accountPage,
  loginPage,
  page,
}) => {
  // Act
  await loginPage.login(testUser1);

  // Assert
  await expect(page).toHaveURL(accountPage.url);
  await page.context().storageState({ path: STORAGE_STATE });
});
