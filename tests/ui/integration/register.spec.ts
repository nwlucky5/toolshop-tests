import { prepareRandomUser } from '@_src/ui/factories/user.factory';
import { expect, test } from '@_src/ui/fixtures/merge.fixture';
import { RegisterUserModel } from '@_src/ui/models/register-model';

test.describe('Register form verification', () => {
  let registerUserData: RegisterUserModel;

  test.beforeEach(async () => {
    registerUserData = prepareRandomUser();
  });
  test('Successful Register register with correct data', async ({
    page,
    loginPage,
    registerPage,
  }) => {
    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(page).toHaveURL(loginPage.url);
  });
  test('Unsuccessful Register action without any of the required values', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.first_name = '';
    registerUserData.last_name = '';
    registerUserData.dateOfBirth = '';
    registerUserData.address = '';
    registerUserData.postcode = '';
    registerUserData.city = '';
    registerUserData.state = '';
    registerUserData.phone = '';
    registerUserData.email = '';
    registerUserData.password = '';

    const expectedFirstNameErrorText = 'First name is required';
    const expectedLastNameErrorText = 'fields.last-name.required';
    const expectedDateOfBirthErrorText = 'Date of Birth is required';
    const expectedAddressErrorText = 'Address is required';
    const expectedPostcodeErrorText = 'Postcode is required';
    const expectedCityErrorText = 'City is required';
    const expectedStateErrorText = 'State is required';
    const expectedCountryErrorText = 'Country is required';
    const expectedPhoneErrorText = 'Phone is required.';
    const expectedEmailAddressErrorText = 'Email is required';
    const expectedPasswordErrorText = 'Password is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData, '');

    // Assert
    await expect
      .soft(registerPage.firstNameError)
      .toHaveText(expectedFirstNameErrorText);
    await expect
      .soft(registerPage.lastNameError)
      .toHaveText(expectedLastNameErrorText);
    await expect
      .soft(registerPage.dateOfBirthError)
      .toHaveText(expectedDateOfBirthErrorText);
    await expect
      .soft(registerPage.addressError)
      .toHaveText(expectedAddressErrorText);
    await expect
      .soft(registerPage.postcodeError)
      .toHaveText(expectedPostcodeErrorText);
    await expect.soft(registerPage.cityError).toHaveText(expectedCityErrorText);
    await expect
      .soft(registerPage.stateError)
      .toHaveText(expectedStateErrorText);
    await expect
      .soft(registerPage.countryError)
      .toHaveText(expectedCountryErrorText);
    await expect
      .soft(registerPage.phoneError)
      .toHaveText(expectedPhoneErrorText);
    await expect
      .soft(registerPage.emailError)
      .toHaveText(expectedEmailAddressErrorText);
    await expect
      .soft(registerPage.passwordError)
      .toHaveText(expectedPasswordErrorText);
  });

  test('Unsuccessful Register action without first name value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.first_name = '';
    const expectedFirstNameErrorText = 'First name is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.firstNameError).toHaveText(
      expectedFirstNameErrorText,
    );
  });

  test('Unsuccessful Register action without last name value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.last_name = '';
    const expectedLastNameErrorText = 'Last name is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.lastNameError).toHaveText(
      expectedLastNameErrorText,
    );
  });

  test('Unsuccessful Register action without date of birth value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.dateOfBirth = '';
    const expectedDateOfBirthErrorText = 'Date of Birth is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.dateOfBirthError).toHaveText(
      expectedDateOfBirthErrorText,
    );
  });

  test('Unsuccessful Register action without address value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.address = '';
    const expectedAddressErrorText = 'Address is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.addressError).toHaveText(
      expectedAddressErrorText,
    );
  });

  test('Unsuccessful Register action without postcode value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.postcode = '';
    const expectedPostcodeErrorText = 'Postcode is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);
    // Assert
    await expect(registerPage.postcodeError).toHaveText(
      expectedPostcodeErrorText,
    );
  });
  test('Unsuccessful Register action without city value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.city = '';
    const expectedCityErrorText = 'City is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.cityError).toHaveText(expectedCityErrorText);
  });

  test('Unsuccessful Register action without state value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.state = '';
    const expectedStateErrorText = 'State is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.stateError).toHaveText(expectedStateErrorText);
  });

  test('Unsuccessful Register action without country value', async ({
    registerPage,
  }) => {
    // Arrange
    const expectedCountryErrorText = 'Country is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData, '');

    // Assert
    await expect(registerPage.countryError).toHaveText(
      expectedCountryErrorText,
    );
  });

  test('Unsuccessful Register action without phone value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.phone = '';
    const expectedPhoneErrorText = 'Phone is required.';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect
      .soft(registerPage.phoneError)
      .toHaveText(expectedPhoneErrorText);
  });

  test('Unsuccessful Register action without email address value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.email = '';
    const expectedEmailAddressErrorText = 'Email is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.emailError).toHaveText(
      expectedEmailAddressErrorText,
    );
  });

  test('Unsuccessful Register action without password value', async ({
    registerPage,
  }) => {
    // Arrange
    registerUserData.password = '';
    const expectedPasswordErrorText = 'Password is required';

    // Act
    await registerPage.prepareRandomUser(registerUserData);

    // Assert
    await expect(registerPage.passwordError).toHaveText(
      expectedPasswordErrorText,
    );
  });
});
