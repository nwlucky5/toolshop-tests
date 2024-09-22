import { apiUrls } from '../utils/api.util';
import { Headers } from '@_src/api/models/headers.api.models';
import { APIRequestContext } from '@playwright/test';

export async function getUserAuthorizationHeader(
  userEmail: string,
  userPassword: string,
  request: APIRequestContext,
): Promise<Headers> {
  const loginData = {
    email: userEmail,
    password: userPassword,
  };

  const loginResponse = await request.post(apiUrls.loginUrl, {
    data: loginData,
  });
  const loginResponseJson = await loginResponse.json();

  return {
    Authorization: `Bearer ${loginResponseJson.access_token}`,
  };
}
