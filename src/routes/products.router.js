import { Router } from "express";
import { productsManager } from "../ProductManager.js";
const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await manager.getProducts(req.query);
    if (!products.length) {
      return res.status(200).json({ message: "No products" });
    }
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await manager.getProductsById(+idProduct);
    if (!product) {
      return res.status(404).json("Product not found with the id provided");
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { title, description, price, code, stock } = req.body;
  if (!title || !description || !price || !code || !stock) {
    return res.status(400).json({ message: "Some data is missing" });
  }
  try {
    const newProduct = await manager.addProduct(req.body);
    res.status(200).json({ message: "Product created", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const response = await manager.updateProduct(+idProduct, req.body);
    if (!response) {
      return res.status(404).json("Product not found with the id provided");
    }
    res.status(200).json({ message: "Product update" });
  } catch (error) {
    res.status(500).json({ message: "error.message" });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    const product = await manager.deleteProduct(+idProduct);
    if (!product) {
      return res.status(404).json("Product not found with the id provided");
    }
    await productsManager.deleteProduct(+idProduct);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
