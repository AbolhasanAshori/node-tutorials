const Product = require("../models/product");

function getAddProduct(_req, res) {
  res.render("admin/edit-product", {
    title: "Add Product",
    path: "/admin/add-product",
    editing: false,
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
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.error(err));
}

function getEditProduct(req, res) {
  const id = req.params.productId;
  const editMode = req.query.edit === "true";

  if (!editMode) return res.redirect("/");

  Product.findById(id, (product) => {
    if (!product) return res.redirect("/");

    res.render("admin/edit-product", {
      title: "Update Product",
      path: "/admin/edit-product",
      editing: editMode,
      product,
      config: {
        css: {
          product: true,
          forms: true,
        },
      },
    });
  });
}

function postEditProduct(req, res) {
  const id = req.body.productId;
  const { title, imageUrl, price, description } = req.body;

  const updatedProduct = new Product(id, title, imageUrl, description, price);
  updatedProduct.save();
  res.redirect("/admin/products");
}

function postDeleteProduct(req, res) {
  const id = req.body.productId;
  Product.deleteById(id);
  res.redirect("/admin/products");
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
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
