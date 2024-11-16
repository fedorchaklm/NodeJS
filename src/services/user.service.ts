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

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await userRepository.getUserByEmail(email);
  if (user === null) {
    throw new Error('No such user with such email'); 
  }
  return user;
};

