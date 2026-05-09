const path = require("node:path");
const fs = require("node:fs");

const dbPath = path.join(path.dirname(require.main.filename), "data", "cart.json");

// biome-ignore lint/complexity/noStaticOnlyClass: will be completed in the future
class Cart {
  static addProduct(id, productPrice) {
    fs.readFile(dbPath, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) cart = JSON.parse(fileContent);

      const existingProductIndex = cart.products.findIndex((p) => p.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct, qty: ++existingProduct.qty };
        cart.products = cart.products.map((p, index) => (index === existingProductIndex ? updatedProduct : p));
      } else {
        updatedProduct = { id, qty: 1 };
        cart.products.push(updatedProduct);
      }
      cart.totalPrice += +productPrice;

      fs.writeFile(dbPath, JSON.stringify(cart), (err) => {
        console.error(err);
      });
    });
  }
}

module.exports = Cart;
