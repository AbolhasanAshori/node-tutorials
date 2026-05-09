const express = require("express");
const { getAddProduct, postAddProduct, getProducts } = require("../controllers/admin");

const router = express.Router();

router.get("/add-product", getAddProduct).get("/products", getProducts).post("/add-product", postAddProduct);

module.exports = router;
