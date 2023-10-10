import { existsSync, promises } from "fs";
import { productsManager } from "./ProductManager.js";
const path = "CartsProducts.json";

class CartsManager {
  async getCarts() {
    try {
      if (existsSync(path)) {
        const cartsFile = await promises.readFile(path, "utf-8");
        const cartsData = JSON.parse(cartsFile);
        return cartsData;
      } else {
        console.log("no existe el archivo");
        return [];
      }
    } catch (error) {
      console.log("error", error);
      return error;
    }
  }
  async addCart() {
    try {
      const carts = await this.getCarts();
      let id;
      if (!carts.length) {
        id = 1;
      } else {
        id = carts[carts.length - 1].id + 1;
      }
      const newCart = { id, products: [] };
      carts.push(newCart);
      await promises.writeFile(path, JSON.stringify(carts));
      return newCart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async getCartsById(id) {
    try {
      const Carts = await this.getCarts({});
      const cart = Carts.findd((p) => p.id === id);
      return cart;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async addProductToCart(idCart, idProduct) {
    const cart = await this.getCartsById(idCart); //valido que el carrito existe
    if (!cart) {
      throw new Error("There is no cart with this id");
    }
    const product = await productsManager.getProductById(idProduct); //valido que el producto existe
    if (!product) {
      throw new Error("there is no product with this id");
    }
    const productIndex = cart.products.findIndex(
      (p) => p.product === idProduct
    );
    if (productIndex === -1) {
      cart.products.push({ product: idProduct, quantity: 1 });
    } else {
      cart.products[productIndex].quantity++;
    }
  }
}

export const cartsManager = new CartsManager();
