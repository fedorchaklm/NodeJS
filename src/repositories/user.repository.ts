import { users } from "../storage";
import { User, Maybe } from "../types/types";

export const addUser = (user: User): User => {
  users.push(user);
  return user;
};

export const getUserByEmail = (email: string): Maybe<User> => {
  const currentUser = users.find((user) => user.email === email);
  return currentUser;
};
