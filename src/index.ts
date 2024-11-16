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
import { connectDB, disconnectDB } from './db/db';
import { Server } from 'http';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http:/localhost:3000',
    credentials: true,
  })
);

const spaggedDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spaggedDocument));
app.use('/api/register', userRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

app.use(errorHandler);

let server: Server;

export const startServer = async () => {
  await connectDB();
  await createAdmin(config.adminPassword, config.adminName, config.adminEmail);
  server = app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`);
  });
  return server;
};

export const stopServer = async () => {
  if (server != null) {
    server.close();
  }
  await disconnectDB();
};

console.log('>', config.environment);

if (config.environment !== 'test') {
  startServer();
}

export default app;
