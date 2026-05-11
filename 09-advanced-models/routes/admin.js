const express = require("express");
const {
  getAddProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  postDeleteProduct,
} = require("../controllers/admin");

const router = express.Router();

router
  .get("/products", getProducts)
  .get("/add-product", getAddProduct)
  .post("/add-product", postAddProduct)
  .get("/edit-product/:productId", getEditProduct)
  .post("/edit-product", postEditProduct)
  .post("/delete-product", postDeleteProduct);

module.exports = router;
