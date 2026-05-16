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
  const product = new Product(title, price, imageUrl, description);
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

  req.user
    .getProducts({ where: { id } })
    .then((products) => {
      const product = products[0];
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

  Product.findByPk(id)
    .then((product) => {
      Object.assign(product, {
        title,
        price,
        imageUrl,
        description,
      });
      return product.save();
    })
    .then(() => {
      console.log("Product Updated!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
}

function postDeleteProduct(req, res) {
  const id = req.body.productId;
  Product.findByPk(id)
    .then((product) => {
      return product.destroy();
    })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.error(err));
}

function getProducts(req, res) {
  req.user
    .getProducts()
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
