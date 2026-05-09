const express = require("express");
const { getProducts, getIndex, getCart, getCheckout, getOrders } = require("../controllers/shop");

const router = express.Router();

router
  .get("/", getIndex)
  .get("/products", getProducts)
  .get("/cart", getCart)
  .get("/orders", getOrders)
  .get("/checkout", getCheckout);

module.exports = router;
