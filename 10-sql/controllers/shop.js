const Cart = require("../models/cart");
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
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find((p) => p.id === product.id);
        if (cartProductData) cartProducts.push({ productData: product, qty: cartProductData.qty });
      }
      res.render("shop/cart", {
        title: "Your Cart",
        path: "/cart",
        products: cartProducts,
        hasProducts: cartProducts.length > 0,
        config: {
          activePath: { cart: true },
        },
      });
    });
  });
}

function postCart(req, res) {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });
  res.redirect("/cart");
}

function postCartDeleteProduct(req, res) {
  const id = req.body.productId;
  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
    res.redirect("/cart");
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
  postCart,
  postCartDeleteProduct,
  getOrders,
  getCheckout,
};
