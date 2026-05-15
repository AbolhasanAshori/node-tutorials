const Cart = require("../models/cart");
const Product = require("../models/product");

function getProducts(_req, res) {
  Product.findAll()
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
  Product.findByPk(id)
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
  Product.findAll()
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
    .then((cart) => cart.getProducts())
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
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;

      return cart.getProducts({ where: { id } });
    })
    .then((products) => {
      if (products.length > 0) {
        const existingProduct = products[0];
        newQuantity = existingProduct.cartItem.quantity + 1;
        return existingProduct;
      }

      return Product.findByPk(id);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.error(err));
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
