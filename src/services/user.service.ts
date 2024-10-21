import crypto from 'crypto';
import * as userRepository from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { User } from '../types/types';
import { APP_ROLES } from '../types/types';

export const registerNewUser = async ({ password, name, email }): Promise<User> => {
  const isEmailInUse = userRepository.getUserByEmail(email) != null;
  if (isEmailInUse) {
    throw new Error('Email is in use');
  }
  const id = crypto.randomUUID();
  const hash: string = await bcrypt.hash(password, 12);
  const newUser = { id, name, email, password: hash, role: APP_ROLES.Customer };
  return userRepository.addUser(newUser);
};

export const getUserByEmail = (email: string): User | undefined => {
  return userRepository.getUserByEmail(email);
};
