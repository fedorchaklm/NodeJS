import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDBConnection, { dbName: 'nodejs' });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    process.exit(1);
  }
};