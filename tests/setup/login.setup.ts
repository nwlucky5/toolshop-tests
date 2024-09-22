import { STORAGE_STATE } from '@_pw-config';
import { expect, test } from '@_src/fixtures/merge.fixture';
import { testUser1 } from '@_src/test-data/test.data';

test('login and save session', async ({ accountPage, loginPage, page }) => {
  // Act
  await loginPage.login(testUser1);

  // Assert
  await expect(page).toHaveURL(accountPage.url);
  await page.context().storageState({ path: STORAGE_STATE });
});
