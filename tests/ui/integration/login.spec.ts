import { LoginUserModel } from '../../src/models/user.model';
import { LoginPage } from '../../src/pages/login.page';
import { testUser1 } from '../../src/test-data/test.data';
import test, { expect } from '@playwright/test';

test.describe('Login verification', () => {
  let loginPage: LoginPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });
  test('Login with correct credentials', async () => {
    // Arrange
    const expectedUsername = 'Jane Doe';

    // Act
    await loginPage.login(testUser1);

    // Assert
    await expect(loginPage.mainMenu.userSubmenu).toHaveText(expectedUsername);
  });
  test('Unsuccessful Login with no email and no password', async () => {
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
  test('Unsuccessful Login with no email', async () => {
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
  test('Unsuccessful Login with incorrectly formatted email', async () => {
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
  test('Unsuccessful Login with invalid email', async () => {
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
  test('Unsuccessful Login with no password', async () => {
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
  test('Unsuccessful Login with too short password', async () => {
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
  test('Unsuccessful Login with incorrect password', async () => {
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
