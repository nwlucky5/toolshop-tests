import { RegisterUserModel } from '../models/register-model';
import { faker } from '@faker-js/faker/locale/en';

export function prepareRandomUser(): RegisterUserModel {
  const registerUserData: RegisterUserModel = {
    first_name: faker.person.firstName().replace(/[^A-Za-z]/g, ''),
    last_name: faker.person.lastName().replace(/[^A-Za-z]/g, ''),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
    postcode: faker.location.zipCode(),
    phone: faker.string.numeric(9),
    dob: '',
    password: '',
    email: '',
  };

  const randomDate = faker.date.between({
    from: '1950-01-01',
    to: '2006-01-01',
  });
  registerUserData.dob = randomDate.toLocaleDateString('en-CA');

  registerUserData.password = faker.internet.password({
    prefix: '#$%9Av',
    length: 12,
  });

  registerUserData.email = faker.internet.email({
    firstName: registerUserData.first_name,
    lastName: registerUserData.last_name,
  });

  return registerUserData;
}
