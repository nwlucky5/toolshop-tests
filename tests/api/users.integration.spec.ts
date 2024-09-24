import { expectGetResponseStatus } from '@_src/api/assertions/assertions.api';
import { getAdminAuthorizationHeader } from '@_src/api/factories/admin-authorization-header.api.factory';
import { getUserAuthorizationHeader } from '@_src/api/factories/user-authorization-header.api.factory';
import { createUserWithApi } from '@_src/api/factories/user-create.api.factory';
import { prepareUserPayload } from '@_src/api/factories/user-payload.api.factory';
import { Headers } from '@_src/api/models/headers.api.models';
import { RegisterUserPayload } from '@_src/api/models/register.api.models';
import { apiUrls } from '@_src/api/utils/api.util';
import test, { APIResponse, expect } from '@playwright/test';

test.describe('Verify user CRUD operations @crud', () => {
  let headersAdmin: Headers;
  let headers: Headers;
  let responseUser: APIResponse;
  let userData: RegisterUserPayload;
  test.beforeAll('should login as admin', async ({ request }) => {
    headersAdmin = await getAdminAuthorizationHeader(request);
  });

  test.beforeEach(
    'should create and login as a new user',
    async ({ request }) => {
      userData = prepareUserPayload();
      responseUser = await createUserWithApi(request, headersAdmin, userData);
      headers = await getUserAuthorizationHeader(
        userData.email,
        userData.password,
        request,
      );
    },
  );

  test('should create user without authorization', async () => {
    // Arrange
    const expectedStatusCode = 201;
    const actualResponseStatus = responseUser.status();
    const userJson = await responseUser.json();

    // Assert
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

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

  test('should update user when logged in as admin user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 200;
    const userJson = await responseUser.json();
    const userId = userJson.id;
    const userDataUpdated = prepareUserPayload();

    // Act
    const responseUserUpdated = await request.put(
      `${apiUrls.usersUrl}/${userId}`,
      {
        headers: headersAdmin,
        data: userDataUpdated,
      },
    );

    // Assert
    const actualResponseStatus = responseUserUpdated.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check updated user
    const responseUserUpdatedGet = await request.get(
      `${apiUrls.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userUpdatedGetJson = await responseUserUpdatedGet.json();

    expect
      .soft(userUpdatedGetJson.first_name)
      .toEqual(userDataUpdated.first_name);
    expect
      .soft(userUpdatedGetJson.last_name)
      .toEqual(userDataUpdated.last_name);
    expect.soft(userUpdatedGetJson.address).toEqual(userDataUpdated.address);
    expect.soft(userUpdatedGetJson.city).toEqual(userDataUpdated.city);
    expect.soft(userUpdatedGetJson.state).toEqual(userDataUpdated.state);
    expect.soft(userUpdatedGetJson.country).toEqual(userDataUpdated.country);
    expect.soft(userUpdatedGetJson.postcode).toEqual(userDataUpdated.postcode);
    expect.soft(userUpdatedGetJson.phone).toEqual(userDataUpdated.phone);
    expect.soft(userUpdatedGetJson.dob).toEqual(userDataUpdated.dob);
    expect.soft(userUpdatedGetJson.email).toEqual(userDataUpdated.email);
  });

  test('should update user when logged in as the same user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 200;
    const userJson = await responseUser.json();
    const userId = userJson.id;
    const userDataUpdated = prepareUserPayload();

    // Act
    const responseUserUpdated = await request.put(
      `${apiUrls.usersUrl}/${userId}`,
      {
        headers,
        data: userDataUpdated,
      },
    );

    // Assert
    const actualResponseStatus = responseUserUpdated.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check updated user
    const responseUserUpdatedGet = await request.get(
      `${apiUrls.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userUpdatedGetJson = await responseUserUpdatedGet.json();

    expect
      .soft(userUpdatedGetJson.first_name)
      .toEqual(userDataUpdated.first_name);
    expect
      .soft(userUpdatedGetJson.last_name)
      .toEqual(userDataUpdated.last_name);
    expect.soft(userUpdatedGetJson.address).toEqual(userDataUpdated.address);
    expect.soft(userUpdatedGetJson.city).toEqual(userDataUpdated.city);
    expect.soft(userUpdatedGetJson.state).toEqual(userDataUpdated.state);
    expect.soft(userUpdatedGetJson.country).toEqual(userDataUpdated.country);
    expect.soft(userUpdatedGetJson.postcode).toEqual(userDataUpdated.postcode);
    expect.soft(userUpdatedGetJson.phone).toEqual(userDataUpdated.phone);
    expect.soft(userUpdatedGetJson.dob).toEqual(userDataUpdated.dob);
    expect.soft(userUpdatedGetJson.email).toEqual(userDataUpdated.email);
  });

  test('should not update user without authorization', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 401;
    const userJson = await responseUser.json();
    const userId = userJson.id;
    const userDataUpdated = prepareUserPayload();

    // Act
    const responseUserUpdated = await request.put(
      `${apiUrls.usersUrl}/${userId}`,
      {
        data: userDataUpdated,
      },
    );

    // Assert
    const actualResponseStatus = responseUserUpdated.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check not updated user
    const responseUserUpdatedGet = await request.get(
      `${apiUrls.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userUpdatedGetJson = await responseUserUpdatedGet.json();

    expect.soft(userUpdatedGetJson.first_name).toEqual(userData.first_name);
    expect.soft(userUpdatedGetJson.last_name).toEqual(userData.last_name);
    expect.soft(userUpdatedGetJson.address).toEqual(userData.address);
    expect.soft(userUpdatedGetJson.city).toEqual(userData.city);
    expect.soft(userUpdatedGetJson.state).toEqual(userData.state);
    expect.soft(userUpdatedGetJson.country).toEqual(userData.country);
    expect.soft(userUpdatedGetJson.postcode).toEqual(userData.postcode);
    expect.soft(userUpdatedGetJson.phone).toEqual(userData.phone);
    expect.soft(userUpdatedGetJson.dob).toEqual(userData.dob);
    expect.soft(userUpdatedGetJson.email).toEqual(userData.email);
  });

  test('should delete user when logged in as admin user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 204;
    const userJson = await responseUser.json();
    const userId = userJson.id;

    // Act
    const responseUserDeleted = await request.delete(
      `${apiUrls.usersUrl}/${userId}`,
      {
        headers: headersAdmin,
      },
    );

    // Assert
    const actualResponseStatus = responseUserDeleted.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check deleted user
    const expectedDeletedUserStatusCode = 404;
    await expectGetResponseStatus(
      request,
      `${apiUrls.usersUrl}/${userId}`,
      expectedDeletedUserStatusCode,
      headersAdmin,
    );
  });

  test('should not delete user when logged in as the same user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 403;
    const userJson = await responseUser.json();
    const userId = userJson.id;

    // Act
    const responseUserDeleted = await request.delete(
      `${apiUrls.usersUrl}/${userId}`,
      {
        headers,
      },
    );

    // Assert
    const actualResponseStatus = responseUserDeleted.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check not deleted user
    const expectedNotDeletedUserStatusCode = 200;
    await expectGetResponseStatus(
      request,
      `${apiUrls.usersUrl}/${userId}`,
      expectedNotDeletedUserStatusCode,
      headersAdmin,
    );
  });

  test('should not delete a user without authorization', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const userJson = await responseUser.json();
    const userId = userJson.id;

    // Act
    const responseUserDeleted = await request.delete(
      `${apiUrls.usersUrl}/${userId}`,
    );

    // Assert
    const actualResponseStatus = responseUserDeleted.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check not deleted user
    const expectedNotDeletedUserStatusCode = 200;
    await expectGetResponseStatus(
      request,
      `${apiUrls.usersUrl}/${userId}`,
      expectedNotDeletedUserStatusCode,
      headersAdmin,
    );
  });
});
