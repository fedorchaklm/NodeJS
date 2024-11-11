import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  try {
    console.log('>', config);
    // await mongoose.connect(config.mongoDBConnection, { dbName: 'nodejs' });
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    process.exit(1);
  }
};