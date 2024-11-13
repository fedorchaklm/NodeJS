import mongoose from 'mongoose';
import config from '../config';

export const connectDB = async () => {
  try {
    // await mongoose.connect(config.mongoDBConnection, { dbName: 'nodejs' });
    await mongoose.connect(config.mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
};

export const clearDB = async () => {
  await mongoose.connection.dropDatabase();
}
