const path = require("node:path");
const fs = require("node:fs");

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(dbPath, JSON.stringify(products), (err) => {
        console.error(err);
      });
    });
  }
}

module.exports = Product;
