import { expect, test } from '@_src/fixtures/merge.fixture';
import { LoginUserModel } from '@_src/models/user.model';
import { testUser1 } from '@_src/test-data/test.data';

test.describe('Login verification', () => {
  test('Login with correct credentials', async ({ loginPage }) => {
    // Arrange
    const expectedUsername = 'Jack Howe';

    // Act
    await loginPage.login(testUser1);

    // Assert
    await expect(loginPage.mainMenu.userSubmenu).toHaveText(expectedUsername);
  });
  test('Unsuccessful Login with no email and no password', async ({
    loginPage,
  }) => {
    // Arrange
    const expectedEmailErrorText = 'Email is required';
    const expectedPasswordErrorText = 'Password is required';
    const loginUserData: LoginUserModel = {
      userEmail: '',
      userPassword: '',
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect.soft(loginPage.emailError).toHaveText(expectedEmailErrorText);
    await expect
      .soft(loginPage.passwordError)
      .toHaveText(expectedPasswordErrorText);
  });
  test('Unsuccessful Login with no email', async ({ loginPage }) => {
    // Arrange
    const expectedEmailErrorText = 'Email is required';
    const loginUserData: LoginUserModel = {
      userEmail: '',
      userPassword: testUser1.userPassword,
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect(loginPage.emailError).toHaveText(expectedEmailErrorText);
  });
  test('Unsuccessful Login with incorrectly formatted email', async ({
    loginPage,
  }) => {
    // Arrange
    const expectedEmailErrorText = 'Email format is invalid';
    const loginUserData: LoginUserModel = {
      userEmail: 'email',
      userPassword: testUser1.userPassword,
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect(loginPage.emailError).toHaveText(expectedEmailErrorText);
  });
  test('Unsuccessful Login with invalid email', async ({ loginPage }) => {
    // Arrange
    const expectedLoginErrorText = 'Invalid email or password';
    const loginUserData: LoginUserModel = {
      userEmail: 'incorrect@email',
      userPassword: testUser1.userPassword,
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedLoginErrorText);
  });
  test('Unsuccessful Login with no password', async ({ loginPage }) => {
    // Arrange
    const expectedPasswordErrorText = 'Password is required';
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: '',
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedPasswordErrorText);
  });
  test('Unsuccessful Login with too short password', async ({ loginPage }) => {
    // Arrange
    const expectedPasswordErrorText = 'Password length is invalid';
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: '1',
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect(loginPage.passwordError).toHaveText(expectedPasswordErrorText);
  });
  test('Unsuccessful Login with incorrect password', async ({ loginPage }) => {
    // Arrange
    const expectedLoginErrorText = 'Invalid email or password';
    const loginUserData: LoginUserModel = {
      userEmail: testUser1.userEmail,
      userPassword: 'incorrectPassword',
    };

    // Act
    await loginPage.login(loginUserData);

    // Assert
    await expect(loginPage.loginError).toHaveText(expectedLoginErrorText);
  });
});
