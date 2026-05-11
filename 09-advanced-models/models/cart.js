const path = require("node:path");
const fs = require("node:fs");

const dbPath = path.join(path.dirname(require.main.filename), "data", "cart.json");

function getCartFromFile(callback) {
  fs.readFile(dbPath, (err, fileContent) => {
    if (err) {
      return callback(null);
    }

    callback(JSON.parse(fileContent));
  });
}

// biome-ignore lint/complexity/noStaticOnlyClass: will be completed in the future
class Cart {
  static addProduct(id, productPrice) {
    getCartFromFile((cartFromFile) => {
      let cart = { products: [], totalPrice: 0 };

      if (cartFromFile) cart = cartFromFile;

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

  static deleteProduct(id, productPrice) {
    getCartFromFile((cart) => {
      if (!cart) return;
      const product = cart.products.find((p) => p.id === id);

      const updatedCart = {
        products: cart.products.filter((p) => p.id !== id),
        totalPrice: cart.totalPrice - productPrice * product.qty,
      };

      fs.writeFile(dbPath, JSON.stringify(updatedCart), (err) => {
        console.error(err);
      });
    });
  }
}

module.exports = Cart;
