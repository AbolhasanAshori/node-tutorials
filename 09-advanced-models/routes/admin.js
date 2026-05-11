const express = require("express");
const { getAddProduct, postAddProduct, getProducts, getEditProduct, postEditProduct } = require("../controllers/admin");

const router = express.Router();

router
  .get("/add-product", getAddProduct)
  .get("/products", getProducts)
  .get("/edit-product/:productId", getEditProduct)
  .post("/edit-product", postEditProduct)
  .post("/add-product", postAddProduct);

module.exports = router;
