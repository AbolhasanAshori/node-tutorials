const path = require("node:path");
const fs = require("node:fs");
const Cart = require("./cart");

const dbPath = path.join(path.dirname(require.main.filename), "data", "products.json");

function getProductsFromFile(callback) {
  fs.readFile(dbPath, (err, data) => {
    if (err) {
      return callback([]);
    }
    callback(JSON.parse(data));
  });
}

class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      callback(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((p) => p.id === id);
      const updatedProducts = products.filter((p) => p.id !== id);
      fs.writeFile(dbPath, JSON.stringify(updatedProducts), (err) => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex((p) => p.id === this.id);
        const updatedProducts = products.map((p, index) => (existingProductIndex === index ? this : p));
        fs.writeFile(dbPath, JSON.stringify(updatedProducts), (err) => {
          console.error(err);
        });
      } else {
        this.id = Math.random().toString();
        products.push(this);
        fs.writeFile(dbPath, JSON.stringify(products), (err) => {
          console.error(err);
        });
      }
    });
  }
}

module.exports = Product;
