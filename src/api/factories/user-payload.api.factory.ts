import { RegisterUserPayload } from '@_src/api/models/register.api.models';
import { prepareRandomUser } from '@_src/ui/factories/user.factory';

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
    dob: randomUserData.dateOfBirth,
    password: randomUserData.password,
    email: randomUserData.email,
  };
  return userData;
}
