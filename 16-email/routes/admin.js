const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router
  .get("/products", isAuthenticated, getProducts)
  .get("/add-product", isAuthenticated, getAddProduct)
  .post("/add-product", isAuthenticated, postAddProduct)
  .get("/edit-product/:productId", isAuthenticated, getEditProduct)
  .post("/edit-product", isAuthenticated, postEditProduct)
  .post("/delete-product", isAuthenticated, postDeleteProduct);

module.exports = router;
