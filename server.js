import express from "express";
import { manager } from "./ProductManager.js";

const app = express();

app.use(express.json());

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

app.post("/api/products", async (req, res) => {
  const { title, description, price, thumbnail, code, stock } = req.body;
  console.log("Body", req.body);
  if (!title || !description || !price || !thumbnail || !code || !stock) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const response = await manager.addProduct(req.body);
    res.status(200).json({ message: "Product created", product: response });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await manager.updateProduct(+id, req.body);
    if (!response) {
      return res.status(404).json("Product not found with the id provided");
    }
    res.status(200).json({ message: "Product update" });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await manager.deleteProduct(+id);
    if (!response) {
      return res.status(404).json("Product not found with the id provided");
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, () => {
  console.log("Puerto en 8080");
});
