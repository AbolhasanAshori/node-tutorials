const express = require("express");
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductItem,
  postCart,
  postCartDeleteProduct,
  postOrder,
} = require("../controllers/shop");

const router = express.Router();

router
  .get("/", getIndex)
  .get("/products", getProducts)
  .get("/products/:productId", getProductItem)
  .get("/cart", getCart)
  .post("/cart", postCart)
  .post("/cart-delete-item", postCartDeleteProduct)
  .get("/orders", getOrders)
  .post("/create-order", postOrder)
  .get("/checkout", getCheckout);

module.exports = router;
