import { testUser2 } from '@_src/ui/test-data/test.data';
import { APIRequestContext } from '@playwright/test';

export interface RegisterUserPayload {
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  phone: string;
  dob: string;
  password: string;
  email: string;
}

export interface Headers {
  [key: string]: string;
}

export const apiLinks = {
  usersUrl: 'https://api.practicesoftwaretesting.com/users',
  registerUrl: 'https://api.practicesoftwaretesting.com/users/register',
  loginUrl: 'https://api.practicesoftwaretesting.com/users/login',
};

export async function getAdminAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginData = {
    email: testUser2.userEmail,
    password: testUser2.userPassword,
  };

  const loginResponse = await request.post(apiLinks.loginUrl, {
    data: loginData,
  });
  const loginResponseJson = await loginResponse.json();

  return {
    Authorization: `Bearer ${loginResponseJson.access_token}`,
  };
}

export async function getUserAuthorizationHeader(
  userEmail: string,
  userPassword: string,
  request: APIRequestContext,
): Promise<Headers> {
  const loginData = {
    email: userEmail,
    password: userPassword,
  };

  const loginResponse = await request.post(apiLinks.loginUrl, {
    data: loginData,
  });
  const loginResponseJson = await loginResponse.json();

  return {
    Authorization: `Bearer ${loginResponseJson.access_token}`,
  };
}

export async function getAuthorizationHeader(
  request: APIRequestContext,
): Promise<Headers> {
  const loginData = {
    email: testUser2.userEmail,
    password: testUser2.userPassword,
  };

  const loginResponse = await request.post(apiLinks.loginUrl, {
    data: loginData,
  });
  const loginResponseJson = await loginResponse.json();

  return {
    Authorization: `Bearer ${loginResponseJson.access_token}`,
  };
}
