import * as userRepository from '../repositories/user.repository';
import bcrypt from 'bcrypt';
import { User } from '../types/types';
import { APP_ROLES } from '../types/types';

export const registerNewUser = async ({ password, name, email }): Promise<User> => {
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser != null) {
    throw new Error('Email is in use');
  }
  const hash: string = await bcrypt.hash(password, 12);
  const newUser = { name, email, password: hash, role: APP_ROLES.Customer };
  return userRepository.addUser(newUser);
};

export const getUserByEmail = (email: string): Promise<User | null> => {
  return userRepository.getUserByEmail(email);
};

