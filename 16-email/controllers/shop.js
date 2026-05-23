const { Order } = require("../models");
const Product = require("../models/product");

/** @type {import('../middleware').ExpressMiddleware} */
function getProducts(_req, res) {
  Product.find()
    .then((products) => {
      res.render("shop/product-list", {
        title: "All Products",
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

/** @type {import('../middleware').ExpressMiddleware} */
function getProductItem(req, res) {
  const id = req.params.productId;
  Product.findById(id)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        title: product.title,
        config: {
          activePath: { productList: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

/** @type {import('../middleware').ExpressMiddleware} */
function getIndex(_req, res) {
  Product.find()
    .then((products) => {
      res.render("shop/index", {
        title: "Shop",
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

/** @type {import('../middleware').ExpressMiddleware} */
function getCart(req, res) {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items;

      res.render("shop/cart", {
        title: "Your Cart",
        products,
        hasProducts: products.length > 0,
        config: {
          css: { cart: true },
          activePath: { cart: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

/** @type {import('../middleware').ExpressMiddleware} */
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

/** @type {import('../middleware').ExpressMiddleware} */
function postCartDeleteProduct(req, res) {
  const id = req.body.productId;

  req.user
    .deleteCartItem(id)
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
}

/** @type {import('../middleware').ExpressMiddleware} */
function getOrders(req, res) {
  Order.find({ "user.userId": req.user._id })
    .then((orders) => {
      res.render("shop/orders", {
        title: "Orders",
        hasOrders: orders.length > 0,
        orders,
        config: {
          activePath: { orders: true },
          css: { orders: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

/** @type {import('../middleware').ExpressMiddleware} */
function postOrder(req, res) {
  req.user
    .populate("cart.items.productId")
    .then((user) => {
      const products = user.cart.items.map((item) => ({ quantity: item.quantity, product: item.productId._doc }));
      const order = new Order({
        products,
        user: {
          name: req.user.name,
          userId: req.user,
        },
      });
      return order.save();
    })
    .then(() => {
      return req.user.clearCart;
    })
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
