const Product = require("../models/product");

function getAddProduct(req, res) {
  res.render("admin/edit-product", {
    title: "Add Product",
    editing: false,
    isAuthenticated: req.cookies.loggedIn === "true",
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
  const product = new Product({ title, price: +price, imageUrl, description, userId: req.user });
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

  Product.findById(id)
    .then((product) => {
      if (!product) return res.redirect("/");

      res.render("admin/edit-product", {
        title: "Update Product",
        editing: editMode,
        isAuthenticated: req.cookies.loggedIn === "true",
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

  Product.findById(id)
    .then((product) => {
      product.title = title;
      product.price = price;
      product.imageUrl = imageUrl;
      product.description = description;
      return product.save();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
}

function postDeleteProduct(req, res) {
  const id = req.body.productId;
  Product.findByIdAndDelete(id)
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
}

function getProducts(req, res) {
  Product.find({
    userId: req.user._id,
  })
    // .select("title price -_id")
    // .populate("userId", "name")
    .populate("userId")
    .then((products) => {
      res.render("admin/product-list", {
        hasProducts: products.length > 0,
        products,
        title: "Admin Products",
        isAuthenticated: req.cookies.loggedIn === "true",
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
