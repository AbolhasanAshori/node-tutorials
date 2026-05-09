const Product = require("../models/product");

function getProducts(_req, res) {
  Product.fetchAll((products) => {
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
  });
}

function getProductItem(req, res) {
  const id = req.params.productId;
  Product.findById(id, (product) => {
    res.render("shop/product-detail", {
      product,
      title: product.title,
      path: "/products",
      config: {
        activePath: { productList: true },
      },
    });
  });
}

function getIndex(_req, res) {
  Product.fetchAll((products) => {
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
  });
}

function getCart(_req, res) {
  res.render("shop/cart", {
    title: "Your Cart",
    path: "/cart",
    config: {
      activePath: { cart: true },
    },
  });
}

function getOrders(_req, res) {
  res.render("shop/orders", {
    title: "Orders",
    path: "/orders",
    config: {
      activePath: { orders: true },
    },
  });
}

function getCheckout(_req, res) {
  res.render("shop/checkout", {
    title: "Checkout",
    path: "/checkout",
  });
}

module.exports = {
  getProducts,
  getProductItem,
  getIndex,
  getCart,
  getOrders,
  getCheckout,
};
