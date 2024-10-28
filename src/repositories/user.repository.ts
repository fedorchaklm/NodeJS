import { convert, UserModel } from '../models/user.model';
import { User } from '../types/types';

export const addUser = async (user: User): Promise<User> => {
  const { id, ...rest } = user;
  const newUser = new UserModel({ _id: id, ...rest });
  await newUser.save();
  return convert(newUser);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const user = await UserModel.findOne({ email });
  if (user === null) {
    throw new Error('No such user with such email'); // check
  }
  return convert(user);
};

export const getInfoAboutUser = async (userId: string): Promise<{name: string, email: string}> => {
  const user = await UserModel.findOne({ _id: userId });
  if (user === null) {
    throw new Error('No such user'); // check
  }
  return {name: user.name,
    email: user.email
  };
};
