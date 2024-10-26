import { convert, UserModel } from "../models/user.model";
import { User } from "../types/types";

export const addUser = async (user: User): Promise<User> => {
  const { id, ...rest } = user;
  const newUser = new UserModel({ _id: id, ...rest });
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
