const Cart = require("../models/cart");
const Product = require("../models/product");

function getProducts(_req, res) {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/product-list", {
        title: "All Products",
        path: "/product",
        hasProducts: rows.length > 0,
        products: rows,
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
    .then(([product]) => {
      res.render("shop/product-detail", {
        product: product[0],
        title: product[0].title,
        path: "/products",
        config: {
          activePath: { productList: true },
        },
      });
    })
    .catch((err) => console.error(err));
}

function getIndex(_req, res) {
  Product.fetchAll()
    .then(([rows]) => {
      res.render("shop/index", {
        title: "Shop",
        path: "/",
        hasProducts: rows.length > 0,
        products: rows,
        config: {
          css: { product: true },
          activePath: { shop: true },
        },
      });
    })
    .catch((err) => console.error(err));
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
