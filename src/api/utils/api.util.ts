import { prepareRandomUser } from '@_src/ui/factories/user.factory';
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

export function prepareUserPayload(): RegisterUserPayload {
  const randomUserData = prepareRandomUser();
  const userData = {
    first_name: randomUserData.first_name,
    last_name: randomUserData.last_name,
    address: randomUserData.last_name,
    city: randomUserData.city,
    state: randomUserData.state,
    country: randomUserData.country,
    postcode: randomUserData.postcode,
    phone: randomUserData.phone,
    dob: randomUserData.dob,
    password: randomUserData.password,
    email: randomUserData.email,
  };
  return userData;
}

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
