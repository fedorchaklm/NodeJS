import { users } from "../storage";
import { User } from "../types/types";

export const addUser = (user: User): User => {
  users.push(user);
  return user;
};
