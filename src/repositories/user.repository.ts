import { users } from "../storage";
import { User } from "src/types/types";

export const addUser = (user: User): User => {
  users.push(user);
  return user;
};
