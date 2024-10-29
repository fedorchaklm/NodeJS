import * as userRepository from './repositories/user.repository';
import bcrypt from 'bcrypt';
import {APP_ROLES } from './types/types';
import * as userService from './services/user.service';

export const createAdmin = async (password: string, name: string, email: string): Promise<any> => {
  const hash: string = await bcrypt.hash(password, 12);
  try {
    const admin = await userService.getUserByEmail(email);
    if (admin == null) {
      const admin = { name, email, password: hash, role: APP_ROLES.Admin };
      return await userRepository.addUser(admin);
    }
    throw new Error('Admin already exists');
  } catch (error) {
    console.log("> Error", error.message);
  }
};
