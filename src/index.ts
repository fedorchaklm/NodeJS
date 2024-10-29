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
import { connectDB } from './db/db';

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
  createAdmin(config.adminPassword, config.adminName, config.adminEmail);
  console.log(`Server is running on http://localhost:${config.port}`);
});
