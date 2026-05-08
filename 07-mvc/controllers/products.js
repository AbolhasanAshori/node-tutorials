const products = [];

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
  products.push({ title: req.body.title });
  res.redirect("/");
}

function getProducts(_req, res) {
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
}

module.exports = {
  getAddProduct,
  postAddProduct,
  getProducts,
};
