import { getAdminAuthorizationHeader } from '@_src/api/factories/admin-authorization-header.api.factory';
import { getUserAuthorizationHeader } from '@_src/api/factories/user-authorization-header.api.factory';
import { createUserWithApi } from '@_src/api/factories/user-create.api.factory';
import { prepareUserPayload } from '@_src/api/factories/user-payload.api.factory';
import { Headers } from '@_src/api/models/headers.api.models';
import { RegisterUserPayload } from '@_src/api/models/register.api.models';
import { apiUrls } from '@_src/api/utils/api.util';
import test, { APIResponse, expect } from '@playwright/test';

test.describe('Verify user UPDATE operations @api', () => {
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
      responseUser = await createUserWithApi(request, userData, headersAdmin);
      headers = await getUserAuthorizationHeader(
        userData.email,
        userData.password,
        request,
      );
    },
  );

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
    const responseUserNotUpdatedGet = await request.get(
      `${apiUrls.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userNotUpdatedGetJson = await responseUserNotUpdatedGet.json();

    expect.soft(userNotUpdatedGetJson.first_name).toEqual(userData.first_name);
    expect.soft(userNotUpdatedGetJson.last_name).toEqual(userData.last_name);
    expect.soft(userNotUpdatedGetJson.address).toEqual(userData.address);
    expect.soft(userNotUpdatedGetJson.city).toEqual(userData.city);
    expect.soft(userNotUpdatedGetJson.state).toEqual(userData.state);
    expect.soft(userNotUpdatedGetJson.country).toEqual(userData.country);
    expect.soft(userNotUpdatedGetJson.postcode).toEqual(userData.postcode);
    expect.soft(userNotUpdatedGetJson.phone).toEqual(userData.phone);
    expect.soft(userNotUpdatedGetJson.dob).toEqual(userData.dob);
    expect.soft(userNotUpdatedGetJson.email).toEqual(userData.email);
  });
});
