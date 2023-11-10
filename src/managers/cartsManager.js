import { cartsModel } from "../db/models/carts.model.js";

class CartsManager {
  async createCart() {
    const newCart = { products: [] };
    const response = await cartsModel.create(newCart);
    return response;
  }
  async findCartById(idCart) {
    const response = await cartsModel
      .findById(idCart)
      .populate("products.product");
    return response;
  }
  async addProductToCart(idCart, idProduct) {
    const cart = await cartsModel.findById(idCart);
    const productIndex = cart.products.findIndex(
      (p) => p.product.equals(idProduct) //equals es un metodo de mongoose que compara id de product con un id de mongoose
    );
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
    return cart.save();
  }
}
export const cartsManager = new CartsManager();
