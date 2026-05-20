const express = require("express");
const {
  getIndex,
  getProducts,
  getProductItem,
  postCart,
  getCart,
  postCartDeleteProduct,
  getOrders,
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
  .post("/create-order", postOrder);

module.exports = router;
