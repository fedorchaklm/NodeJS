import { users } from "../storage.js";

export const addUser = (user) => {
  users.push(user);
  return user;
};
