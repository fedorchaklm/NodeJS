import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import errorHandler from './middleware/errorHandler';
import config from './config';
import { createAdmin } from './createAdmin';
import loginRoutes from './routes/login.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import ProductModel from './models/product.model';
import { addManyProducts } from './repositories/product.repository';
import { randomUUID } from 'crypto';

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoDBConnection, { dbName: 'nodejs' });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed');
    process.exit(1);
  }
};

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http:/localhost:3000',
    credentials: true,
  })
);

app.use('/api/register', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  connectDB();
  // addManyProducts([
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Digital Painting',
  //     description: 'A custom digital painting created by a professional artist.',
  //     price: 50,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Online Yoga Class',
  //     description: 'A one-hour online yoga session with a certified instructor.',
  //     price: 20,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'E-Book',
  //     description: 'A bestselling e-book available for instant download.',
  //     price: 10,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Virtual Cooking Class',
  //     description: 'A two-hour virtual cooking class with a renowned chef.',
  //     price: 30,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Music Streaming Subscription',
  //     description: 'A three-month subscription to a premium music streaming service.',
  //     price: 15,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Online Course',
  //     description: 'Access to an online course on a subject of your choice.',
  //     price: 100,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Digital Photo Album',
  //     description: 'A beautifully crafted digital photo album with customizable options.',
  //     price: 25,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Meditation App Subscription',
  //     description: 'A one-year subscription to a popular meditation app.',
  //     price: 40,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Virtual Tour',
  //     description: 'A virtual tour of a famous museum or landmark.',
  //     price: 35,
  //   },
  //   {
  //     id: randomUUID(),
  //     category: 'food',
  //     name: 'Online Personal Training Session',
  //     description: 'A personalized one-hour workout session with a certified trainer.',
  //     price: 45,
  //   },
  // ]);
  createAdmin(config.adminPassword, config.adminName, config.adminEmail);
  console.log(`Server is running on http://localhost:${config.port}`);
});
