import { existsSync, promises } from "fs";
const path = "ProductManager.json";

class ProductManager {
  async getProducts(queryObj) {
    const { limit } = queryObj;
    try {
      if (existsSync(path)) {
        const productFile = await promises.readFile(path, "utf-8");
        const productData = JSON.parse(productFile);
        return limit ? productData.slice(0, +limit) : productData;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async addProduct(producto) {
    try {
      const products = await this.getProducts({}); //busco un array vacio o con informacion
      let id;
      if (!products.length) {
        id = 1;
      } else {
        id = products[products.length - 1].id + 1;
      }
      const newProduct = { id, ...producto };
      products.push(newProduct);
      await promises.writeFile(path, JSON.stringify(products)); //sobre escribe el array con la nueva info incluida
      return newProduct;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProductsById(id) {
    try {
      const products = await this.getProducts({});
      const product = products.filter((p) => p.id === id);
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async updateProduct(id, obj) {
    try {
      const products = await this.getProducts({});
      const index = products.findIndex((p) => p.id === id);
      if (index === -1) {
        return null;
      }
      const updateProduct = { ...products[index], ...obj };
      products.splice(index, 1, updateProduct);
      await promises.writeFile(path, JSON.stringify(products));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteProduct(id) {
    try {
      const products = await this.getProducts({}); // leer el archivo
      const product = products.find((p) => p.id === id);
      if (product) {
        const newArrayProducts = products.filter((p) => p.id !== id);
        await promises.writeFile(path, JSON.stringify(newArrayProducts));
      }
      return product;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export const manager = new ProductManager();
