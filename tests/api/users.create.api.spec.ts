import { getAdminAuthorizationHeader } from '@_src/api/factories/admin-authorization-header.api.factory';
import { createUserWithApi } from '@_src/api/factories/user-create.api.factory';
import { prepareUserPayload } from '@_src/api/factories/user-payload.api.factory';
import test, { expect } from '@playwright/test';

test.describe('Verify user CREATE operations @api', () => {
  test('should create user', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 201;
    const headersAdmin = await getAdminAuthorizationHeader(request);

    // Act
    const userData = prepareUserPayload();
    const responseUser = await createUserWithApi(
      request,
      userData,
      headersAdmin,
    );

    // Assert
    const actualResponseStatus = responseUser.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    const userJson = await responseUser.json();
    expect.soft(userJson.first_name).toEqual(userData.first_name);
    expect.soft(userJson.last_name).toEqual(userData.last_name);
    expect.soft(userJson.address).toEqual(userData.address);
    expect.soft(userJson.city).toEqual(userData.city);
    expect.soft(userJson.state).toEqual(userData.state);
    expect.soft(userJson.country).toEqual(userData.country);
    expect.soft(userJson.postcode).toEqual(userData.postcode);
    expect.soft(userJson.phone).toEqual(userData.phone);
    expect.soft(userJson.dob).toEqual(userData.dob);
    expect.soft(userJson.email).toEqual(userData.email);
  });
});
