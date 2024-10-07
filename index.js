import express from "express";
import bodyParser from "body-parser";
import registerRouter from "./routers/register.js";
import productsRouter from "./routers/products.js";
import cartRouter from "./routers/cart.js";
import { PORT } from "./constants.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(bodyParser.json());

app.use("/api/register", registerRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
