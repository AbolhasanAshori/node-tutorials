const Product = require("../models/product");

function getAddProduct(_req, res) {
  res.render("add-product", {
    title: "Add Product",
    path: "/admin/add-product",
    config: {
      css: {
        product: true,
        forms: true,
      },
      activePath: {
        addProduct: true,
      },
    },
  });
}

function postAddProduct(req, res) {
  const product = new Product(req.body.title);
  product.save();
  res.redirect("/");
}

function getProducts(_req, res) {
  Product.fetchAll((products) => {
    res.render("shop", {
      title: "Shop",
      path: "/",
      hasProducts: products.length > 0,
      products,
      config: {
        css: { product: true },
        activePath: { shop: true },
      },
    });
  });
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
