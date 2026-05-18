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
  const product = new Product({ title, price: +price, imageUrl, description, userId: req.user._id });
  product
    .save()
    .then(() => {
      console.log("Product Created!");
      res.redirect("/");
    })
    .catch((err) => console.error(err));
}

function getEditProduct(req, res) {
  const id = req.params.productId;
  const editMode = req.query.edit === "true";

  if (!editMode) return res.redirect("/");

  Product.findById(id)
    .then((product) => {
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
    })
    .catch((err) => console.error(err));
}

function postEditProduct(req, res) {
  const id = req.body.productId;
  const { title, imageUrl, price, description } = req.body;

  const product = new Product({
    id,
    title,
    price,
    imageUrl,
    description,
  });

  product
    .save()
    .then(() => {
      console.log("Product Updated!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
}

function postDeleteProduct(req, res) {
  const id = req.body.productId;
  Product.deleteById(id)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
}

function getProducts(_req, res) {
  Product.fetchAll()
    .then((products) => {
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
    })
    .catch((err) => console.error(err));
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
  getProducts,
};
