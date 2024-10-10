import crypto from "crypto";
import * as userRepository from "../repositories/user.repository.js";

export const registerNewUser = ({ password, name, email }) => {
  const id = crypto.randomUUID();
  const newUser = { id, name, email, password };
  return userRepository.addUser(newUser);
};
