const Product = require("../models/product");

function getAddProduct(_req, res) {
  res.render("admin/add-product", {
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
  const { title, imageUrl, description, price } = req.body;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect("/");
}

function getProducts(_req, res) {
  Product.fetchAll((products) => {
    res.render("admin/product-list", {
      hasProducts: products.length > 0,
      products,
      title: "Admin Products",
      path: "/admin/product",
      config: {
        css: { product: true },
        activePath: { adminProductList: true },
      },
    });
  });
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
