import { prepareUserPayload } from '@_src/api/factories/user-payload.api.factory';
import {
  Headers,
  RegisterUserPayload,
  apiLinks,
  getAdminAuthorizationHeader,
  getUserAuthorizationHeader,
} from '@_src/api/utils/api.util';
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
    'should create  and login as a new user',
    async ({ request }) => {
      userData = prepareUserPayload();
      responseUser = await request.post(apiLinks.registerUrl, {
        data: userData,
      });
      // assert user exist
      const expectedUserRegistrationStatusCode = 201;
      expect(responseUser.status()).toBe(expectedUserRegistrationStatusCode);

      const userJson = await responseUser.json();
      const responseUserCreated = await request.get(
        `${apiLinks.usersUrl}/${userJson.id}`,
        { headers: headersAdmin },
      );

      const expectedUserRetrievalStatusCode = 200;
      expect(
        responseUserCreated.status(),
        `Expected status: ${expectedUserRetrievalStatusCode} and observed: ${responseUserCreated.status()}`,
      ).toBe(expectedUserRetrievalStatusCode);

      // login as created user
      const loginData = {
        email: userData.email,
        password: userData.password,
      };

      headers = await getUserAuthorizationHeader(
        loginData.email,
        loginData.password,
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
      `${apiLinks.usersUrl}/${userId}`,
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
    const responseUserUpdatedRetrieval = await request.get(
      `${apiLinks.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userUpdatedRetrievalJson = await responseUserUpdatedRetrieval.json();

    expect
      .soft(userUpdatedRetrievalJson.first_name)
      .toEqual(userDataUpdated.first_name);
    expect
      .soft(userUpdatedRetrievalJson.last_name)
      .toEqual(userDataUpdated.last_name);
    expect
      .soft(userUpdatedRetrievalJson.address)
      .toEqual(userDataUpdated.address);
    expect.soft(userUpdatedRetrievalJson.city).toEqual(userDataUpdated.city);
    expect.soft(userUpdatedRetrievalJson.state).toEqual(userDataUpdated.state);
    expect
      .soft(userUpdatedRetrievalJson.country)
      .toEqual(userDataUpdated.country);
    expect
      .soft(userUpdatedRetrievalJson.postcode)
      .toEqual(userDataUpdated.postcode);
    expect.soft(userUpdatedRetrievalJson.phone).toEqual(userDataUpdated.phone);
    expect.soft(userUpdatedRetrievalJson.dob).toEqual(userDataUpdated.dob);
    expect.soft(userUpdatedRetrievalJson.email).toEqual(userDataUpdated.email);
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
      `${apiLinks.usersUrl}/${userId}`,
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
    const responseUserUpdatedRetrieval = await request.get(
      `${apiLinks.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userUpdatedRetrievalJson = await responseUserUpdatedRetrieval.json();

    expect
      .soft(userUpdatedRetrievalJson.first_name)
      .toEqual(userDataUpdated.first_name);
    expect
      .soft(userUpdatedRetrievalJson.last_name)
      .toEqual(userDataUpdated.last_name);
    expect
      .soft(userUpdatedRetrievalJson.address)
      .toEqual(userDataUpdated.address);
    expect.soft(userUpdatedRetrievalJson.city).toEqual(userDataUpdated.city);
    expect.soft(userUpdatedRetrievalJson.state).toEqual(userDataUpdated.state);
    expect
      .soft(userUpdatedRetrievalJson.country)
      .toEqual(userDataUpdated.country);
    expect
      .soft(userUpdatedRetrievalJson.postcode)
      .toEqual(userDataUpdated.postcode);
    expect.soft(userUpdatedRetrievalJson.phone).toEqual(userDataUpdated.phone);
    expect.soft(userUpdatedRetrievalJson.dob).toEqual(userDataUpdated.dob);
    expect.soft(userUpdatedRetrievalJson.email).toEqual(userDataUpdated.email);
  });

  test('should not update user without authorization', async ({ request }) => {
    // Arrange
    const expectedStatusCode = 401;
    const userJson = await responseUser.json();
    const userId = userJson.id;
    const userDataUpdated = prepareUserPayload();

    // Act
    const responseUserUpdated = await request.put(
      `${apiLinks.usersUrl}/${userId}`,
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

    // Assert check updated user
    const responseUserUpdatedRetrieval = await request.get(
      `${apiLinks.usersUrl}/${userJson.id}`,
      { headers: headersAdmin },
    );
    const userUpdatedRetrievalJson = await responseUserUpdatedRetrieval.json();

    expect
      .soft(userUpdatedRetrievalJson.first_name)
      .toEqual(userData.first_name);
    expect.soft(userUpdatedRetrievalJson.last_name).toEqual(userData.last_name);
    expect.soft(userUpdatedRetrievalJson.address).toEqual(userData.address);
    expect.soft(userUpdatedRetrievalJson.city).toEqual(userData.city);
    expect.soft(userUpdatedRetrievalJson.state).toEqual(userData.state);
    expect.soft(userUpdatedRetrievalJson.country).toEqual(userData.country);
    expect.soft(userUpdatedRetrievalJson.postcode).toEqual(userData.postcode);
    expect.soft(userUpdatedRetrievalJson.phone).toEqual(userData.phone);
    expect.soft(userUpdatedRetrievalJson.dob).toEqual(userData.dob);
    expect.soft(userUpdatedRetrievalJson.email).toEqual(userData.email);
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
      `${apiLinks.usersUrl}/${userId}`,
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
    const responseUserDeletedRetrieval = await request.get(
      `${apiLinks.usersUrl}/${userId}`,
      { headers: headersAdmin },
    );
    const expectedDeletedUserStatusCode = 404;
    expect(
      responseUserDeletedRetrieval.status(),
      `expected status code ${expectedDeletedUserStatusCode}, and received ${responseUserDeletedRetrieval.status()}`,
    ).toBe(expectedDeletedUserStatusCode);
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
      `${apiLinks.usersUrl}/${userId}`,
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
    const responseUserDeletedRetrieval = await request.get(
      `${apiLinks.usersUrl}/${userId}`,
      { headers: headersAdmin },
    );
    const expectedDeletedUserStatusCode = 200;
    expect(
      responseUserDeletedRetrieval.status(),
      `expected status code ${expectedDeletedUserStatusCode}, and received ${responseUserDeletedRetrieval.status()}`,
    ).toBe(expectedDeletedUserStatusCode);
  });

  test('should not delete a user using non logged user', async ({
    request,
  }) => {
    // Arrange
    const expectedStatusCode = 401;
    const userJson = await responseUser.json();
    const userId = userJson.id;

    // Act
    const responseUserDeleted = await request.delete(
      `${apiLinks.usersUrl}/${userId}`,
    );

    // Assert
    const actualResponseStatus = responseUserDeleted.status();
    expect(
      actualResponseStatus,
      `expect status code ${expectedStatusCode}, and received ${actualResponseStatus}`,
    ).toBe(expectedStatusCode);

    // Assert check not deleted user
    const responseUserDeletedRetrieval = await request.get(
      `${apiLinks.usersUrl}/${userId}`,
      { headers: headersAdmin },
    );
    const expectedDeletedUserStatusCode = 200;
    expect(
      responseUserDeletedRetrieval.status(),
      `expected status code ${expectedDeletedUserStatusCode}, and received ${responseUserDeletedRetrieval.status()}`,
    ).toBe(expectedDeletedUserStatusCode);
  });
});
