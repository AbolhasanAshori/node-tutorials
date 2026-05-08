const express = require("express");
const { getAddProduct, postAddProduct } = require("../controllers/products");

const router = express.Router();

router.get("/add-product", getAddProduct).post("/add-product", postAddProduct);

module.exports = router;
