import { Router } from "express";
import { cartsManager } from "../CartsManager.js";

const router = Router();
router.post("/", async (req, res) => {
  try {
    const cart = await cartsManager.addCart();
    res.status(200).json({ message: "Cart created", cart: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:idCart", async (req, res) => {
  const { idCart } = req.params;
  try {
    const cart = await cartsManager.getCartsById(+idCart);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart found", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/:idCart/product/:idProduct", async (req, res) => {
  const { idCart, idProduct } = req.params;
  try {
    const newCart = await cartsManager.addProductToCart(+idCart, +idProduct);
    res.status(200).json({ message: "Added product", cart: newCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
export default router;
