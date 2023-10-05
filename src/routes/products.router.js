import { Router } from "express";
import { manager } from "../ProductManager.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts(req.query);
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

export default router;
