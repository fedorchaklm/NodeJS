import { convert, UserModel } from '../models/user.model';
import { CreateUser, User } from '../types/types';

export const getUserById = async (userId: string): Promise<User | null> => {
  const user = await UserModel.findOne({ _id: userId });
  if (user === null) {
    return null;
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
    return null;
  }
  return convert(user);
};
