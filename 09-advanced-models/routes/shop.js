const express = require("express");
const {
  getProducts,
  getIndex,
  getCart,
  getCheckout,
  getOrders,
  getProductItem,
  postCart,
} = require("../controllers/shop");

const router = express.Router();

router
  .get("/", getIndex)
  .get("/products", getProducts)
  .get("/products/:productId", getProductItem)
  .get("/cart", getCart)
  .post("/cart", postCart)
  .get("/orders", getOrders)
  .get("/checkout", getCheckout);

module.exports = router;
