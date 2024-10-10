import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import errorHandler from "./middleware/errorHandler";
import config from './config';

const app = express();

app.use(bodyParser.json());

app.use("/api/register", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
