const express = require("express");
const {
  getProducts,
  getIndex,
  getProductItem,
  postCart,
  getCart,
  postCartDeleteProduct,
  getOrders,
  postOrder,
  getCheckout,
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
