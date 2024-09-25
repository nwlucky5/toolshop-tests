import { expectGetResponseStatus } from '@_src/api/assertions/assertions.api';
import { getAdminAuthorizationHeader } from '@_src/api/factories/admin-authorization-header.api.factory';
import { getUserAuthorizationHeader } from '@_src/api/factories/user-authorization-header.api.factory';
import { createUserWithApi } from '@_src/api/factories/user-create.api.factory';
import { prepareUserPayload } from '@_src/api/factories/user-payload.api.factory';
import { Headers } from '@_src/api/models/headers.api.models';
import { RegisterUserPayload } from '@_src/api/models/register.api.models';
import { apiUrls } from '@_src/api/utils/api.util';
import test, { APIResponse, expect } from '@playwright/test';

test.describe('Verify user DELETE operations @crud', () => {
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
