import { Headers } from '@_src/api/models/headers.api.models';
import { RegisterUserPayload } from '@_src/api/models/register.api.models';
import { apiUrls } from '@_src/api/utils/api.util';
import { expect } from '@_src/ui/fixtures/merge.fixture';
import { APIRequestContext, APIResponse } from '@playwright/test';

export async function createUserWithApi(
  request: APIRequestContext,
  headersAdmin: Headers,
  userData: RegisterUserPayload,
): Promise<APIResponse> {
  const responseUser = await request.post(apiUrls.registerUrl, {
    data: userData,
  });

  // assert user exist
  const userJson = await responseUser.json();
  const responseUserCreated = await request.get(
    `${apiUrls.usersUrl}/${userJson.id}`,
    { headers: headersAdmin },
  );

  const expectedStatusCode = 200;
  expect(
    responseUserCreated.status(),
    `Expected status: ${expectedStatusCode} and observed: ${responseUserCreated.status()}`,
  ).toBe(expectedStatusCode);

  return responseUser;
}
