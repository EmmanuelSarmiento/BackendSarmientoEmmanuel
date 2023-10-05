import express from "express";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();

app.use(express.json());

//Routes Product
app.use("/api/products", productsRouter);

app.listen(8080, () => {
  console.log("Puerto en 8080");
});
