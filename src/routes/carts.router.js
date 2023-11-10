import { Router } from "express";
import { cartsManager } from "../managers/cartsManager.js";

const router = Router();

router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = cartsManager.findCartById(idCart);
    res.status(200).json({ message: "Cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/:idCart/products/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const cart = cartsManager.addProductToCart(idCart, idProduct);
    res.status(200).json({ message: "Add product to cart", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const cart = cartsManager.createCart();
    res.status(200).json({ message: "Cart created", cart });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
