import express from "express";
import bodyParser from "body-parser";
// import cors from "cors";
import registerRouter from "./routers/register.js";
import productsRouter from "./routers/products.js";
import cartRouter from "./routers/cart.js";
import { products, getCart } from "./storage.js";
import { PORT, USER_ID_HEADER } from "./constants.js";

const app = express();

app.use(bodyParser.json());
// app.use(cors());

app.use("/api/register", registerRouter);
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
