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
      return error;
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
      return error;
    }
  }

  async getProductsById(id) {
    try {
      const products = await this.getProducts({});
      const product = products.filter((p) => p.id === id);
      return product;
    } catch (error) {
      return error;
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
      return error;
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
      return error;
    }
  }
}

// Test metodos
const producto1 = {
  title: "Gaseosa Coca cola",
  description: "Gaseosa gasificada con altos porcentajes de azucares agregados",
  price: 20000,
  thumbnail: "jpg",
  code: 255,
  stock: 10,
};
const producto2 = {
  title: "Gaseosa Pepsi cola",
  description: "Gaseosa gasificada con altos porcentajes de azucares agregados",
  price: 20,
  thumbnail: "jpg",
  code: 256,
  stock: 10,
};
const producto3 = {
  id: 5,
  title: "Gaseosa fanta ",
  description: "Gaseosa gasificada con bajos porcentajes de azucares agregados",
  price: 220,
  thumbnail: "jpg",
  code: 356,
  stock: 25,
};

// async function test() {
//   const manager = new ProductManager();
//   /* Agrego productos */
//   await manager.addProduct(producto2);
//   const products = await manager.getProducts();

//   /* Veo el arrays vacio o completado */
//   console.log(products);

//   /* Busco por el id */
//   // await manager.getProductsById(3);

//   /* Elimino segun el id */
//   // await manager.deleteProduct(6);
// }

// test();

export const manager = new ProductManager(ProductManager.js);
