import * as userRepository from './repositories/user.repository';
import bcrypt from 'bcrypt';
import { APP_ROLES } from './types/types';
import * as userService from './services/user.service';

export const createAdmin = async (password: string, name: string, email: string): Promise<any> => {
  const hash: string = await bcrypt.hash(password, 12);
  try {
    await userService.getUserByEmail(email);
    console.log('> Admin already exists');
  } catch (error) {
    if (error.message === 'No such user with such email') {
        const admin = { name, email, password: hash, role: APP_ROLES.Admin };
        await userRepository.addUser(admin);
        console.log('> Admin created');
    }
  }
};
