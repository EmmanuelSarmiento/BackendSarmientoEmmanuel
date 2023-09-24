import express from "express";
import { manager } from "./UserManager.js";

const app = express();

app.get("/api/products", async (req, res) => {
  try {
    const products = await manager.getProducts(req.query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await manager.getProductsById(+id);
    if (!product) {
      return res.status(404).json("Product not found with the id provided");
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, () => {
  console.log("Puerto en 8080");
});
