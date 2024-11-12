import { convert, UserModel } from '../models/user.model';
import { CreateUser, User } from '../types/types';

export const getUserById = async (userId: string): Promise<User> => {
  const user = await UserModel.findOne({ _id: userId });
  if (user === null) {
    throw new Error('No such user with such id'); // check
  }
  return convert(user);
}

export const addUser = async (user: CreateUser): Promise<User> => {
  const newUser = new UserModel(user);
  await newUser.save();
  return convert(newUser);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email });
  if (user === null) {
    // throw new Error('No such user with such email'); 
    return null;
  }
  return convert(user);
};
