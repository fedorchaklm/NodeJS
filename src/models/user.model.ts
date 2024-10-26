import mongoose from 'mongoose';
const { Schema } = mongoose;
import { APP_ROLES, User } from '../types/types';
import { randomUUID } from 'crypto';

const userSchema = new Schema({
  _id: {
    type: String,
    default: function genUUID() {
      return randomUUID();
    },
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
    required: true,
    type: String,
    enum: Object.values(APP_ROLES),
  },
}, { versionKey: false });

userSchema.method('toClient', function(): User {
  const { _id, ...rest } = this.toObject();
  return { id: _id, ...rest };
});

export const UserModel = mongoose.model('User', userSchema);

