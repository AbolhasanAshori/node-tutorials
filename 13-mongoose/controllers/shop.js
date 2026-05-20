const Product = require("../models/product");

function getProducts(_req, res) {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        title: "All Products",
        path: "/product",
        hasProducts: products.length > 0,
        products,
        config: {
          css: { product: true },
          activePath: { productList: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

function getProductItem(req, res) {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        title: product.title,
        path: "/products",
        config: {
          activePath: { productList: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

function getIndex(_req, res) {
  Product.findOneAndReplace()
    .then((products) => {
      res.render("shop/index", {
        title: "Shop",
        path: "/",
        hasProducts: products.length > 0,
        products,
        config: {
          css: { product: true },
          activePath: { shop: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

function getCart(req, res) {
  req.user
    .getCart()
    .then((products) => {
      res.render("shop/cart", {
        title: "Your Cart",
        path: "/cart",
        products,
        hasProducts: products.length > 0,
        config: {
          css: {
            cart: true,
          },
          activePath: { cart: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

function postCart(req, res) {
  const id = req.body.productId;
  Product.findById(id)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch(console.error);
}

function postCartDeleteProduct(req, res) {
  const id = req.body.productId;

  req.user
    .deleteCartItem(id)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
}

function getOrders(req, res) {
  req.user
    .getOrders()
    .then((orders) => {
      res.render("shop/orders", {
        title: "Orders",
        path: "/orders",
        hasOrders: orders.length > 0,
        orders,
        config: {
          activePath: { orders: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

function postOrder(req, res) {
  req.user
    .addOrder()
    .then(() => {
      res.redirect("/orders");
    })
    .catch((err) => console.error(err));
}

module.exports = {
  getProducts,
  getProductItem,
  getIndex,
  getCart,
  postCart,
  postCartDeleteProduct,
  getOrders,
  postOrder,
};
