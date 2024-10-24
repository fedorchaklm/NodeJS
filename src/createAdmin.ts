// Для створення Admin юзера потрібно додати новий файл createAdmin.js і в ньому написати скрипт, який це зробить. Параметри(name, email, password) для створення адміна мають бути в env файлі. Скрипт має виконуватися при запуску програми.
import crypto from "crypto";
import * as userRepository from "./repositories/user.repository";
import bcrypt from "bcrypt";
import { User, APP_ROLES } from "./types/types";
import * as userService from "./services/user.service";

export const createAdmin = async (password: string, name: string,email: string): Promise<User> => {
  const id = crypto.randomUUID();
  const hash: string = await bcrypt.hash(password, 12);
  const admin = userService.getUserByEmail(email);
  if (!admin) {
    const admin = { id, name, email, password: hash, role: APP_ROLES.Admin };
    return userRepository.addUser(admin);
  }
  throw new Error("Admin already exists");
};
