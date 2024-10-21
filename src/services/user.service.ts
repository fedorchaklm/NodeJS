import crypto from "crypto";
import * as userRepository from "../repositories/user.repository";
import { User } from "src/types/types";

export const registerNewUser = ({ password, name, email }): User => {
  const id = crypto.randomUUID();
  const newUser = { id, name, email, password };
  return userRepository.addUser(newUser);
};
