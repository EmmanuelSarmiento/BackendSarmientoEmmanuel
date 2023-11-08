import { Router } from "express";
import { productsManager } from "../managers/productsManager.js";
const router = Router();
router.get("/", async (req, res) => {
  try {
    const products = await productsManager.findAll();
    res.status(200).json({ message: "Products", products });
  } catch (err) {
    res.sendStatus(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const createdProduct = await productsManager.createOne(req.body);
    res.status(200).json({ message: "Products created", createdProduct });
  } catch (err) {
    res.sendStatus(500).json({ error: err.message });
  }
});

router.delete("/:idProduct", async (req, res) => {
  const { idProduct } = req.params;
  try {
    await productsManager.deleteOne(idProduct);
    res.status(200).json({ message: "Products deleted" });
  } catch (err) {
    res.sendStatus(500).json({ error: err.message });
  }
});

export default router;
