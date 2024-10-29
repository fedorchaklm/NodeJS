import mongoose from 'mongoose';
const { Schema } = mongoose;
import { APP_ROLES, User } from '../types/types';
import { randomUUID } from 'crypto';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: APP_ROLES;
}

const userSchema = new Schema(
  {
    _id: {
      type: String,
      default: randomUUID,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(APP_ROLES),
      required: true,
    },
  },
  { versionKey: false }
);

export const convert = (user: IUser): User => ({
  id: user._id,
  name: user.name,
  email: user.email,
  password: user.password,
  role: user.role,
});

export const UserModel = mongoose.model('User', userSchema);
