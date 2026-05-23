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
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router
  .get("/", getIndex)
  .get("/products", getProducts)
  .get("/products/:productId", getProductItem)
  .get("/cart", isAuthenticated, getCart)
  .post("/cart", isAuthenticated, postCart)
  .post("/cart-delete-item", isAuthenticated, postCartDeleteProduct)
  .get("/orders", isAuthenticated, getOrders)
  .post("/create-order", isAuthenticated, postOrder);

module.exports = router;
