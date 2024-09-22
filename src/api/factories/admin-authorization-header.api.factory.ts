import { apiUrls } from '../utils/api.util';
import { Headers } from '@_src/api/models/headers.api.models';
import { testUser2 } from '@_src/ui/test-data/test.data';
import { APIRequestContext } from '@playwright/test';

export async function getAdminAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginData = {
    email: testUser2.userEmail,
    password: testUser2.userPassword,
  };

  const loginResponse = await request.post(apiUrls.loginUrl, {
    data: loginData,
  });
  const loginResponseJson = await loginResponse.json();

  return {
    Authorization: `Bearer ${loginResponseJson.access_token}`,
  };
}
