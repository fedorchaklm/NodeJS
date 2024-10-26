import { UserModel } from "../models/user.model";
// import { users } from "../storage";
import { User } from "../types/types";

export const addUser = async (user: User): Promise<User> => {
  const { id, ...rest } = user;
  const newUser = new UserModel({ _id: id, ...rest });
  await newUser.save();
  return user;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  // const currentUser = users.find((user) => user.email === email);
  const user = await UserModel.findOne({ email });
  if (user === null) {
    return null;
  }
  const { _id, ...rest } = user.toObject();
  return { id: _id, ...rest };
};
