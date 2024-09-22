import { LoginUserModel } from '@_src/models/user.model';
import {
  ADMIN_USER_EMAIL,
  ADMIN_USER_PASSWORD,
  USER_EMAIL,
  USER_PASSWORD,
} from 'config/env.config';

export const testUser1: LoginUserModel = {
  userEmail: USER_EMAIL,
  userPassword: USER_PASSWORD,
};

export const testUser2: LoginUserModel = {
  userEmail: ADMIN_USER_EMAIL,
  userPassword: ADMIN_USER_PASSWORD,
};
