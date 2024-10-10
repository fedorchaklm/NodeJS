import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import dotenv from 'dotenv';
import errorHandler from "./middleware/errorHandler.js";

const app = express();

dotenv.config({
  path: `.env.${process.env.NODE_ENV}`
})
const PORT = process.env.PORT;

app.use(bodyParser.json());

app.use("/api/register", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
