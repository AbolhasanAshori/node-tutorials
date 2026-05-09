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
  constructor(title) {
    this.title = title;
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
