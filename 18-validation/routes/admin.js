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
const { body } = require("express-validator");

const router = express.Router();

const productValidation = [
	body("title").isString().isLength({ min: 3 }).trim(),
	body("imageUrl").isURL(),
	body("price").isFloat(),
	body("description").optional({ checkFalsy: true }).isLength({ min: 5, max: 400 }).trim(),
];

router
	.get("/products", isAuthenticated, getProducts)
	.get("/add-product", isAuthenticated, getAddProduct)
	.post("/add-product", isAuthenticated, productValidation, postAddProduct)
	.get("/edit-product/:productId", isAuthenticated, getEditProduct)
	.post("/edit-product", isAuthenticated, productValidation, postEditProduct)
	.post("/delete-product", isAuthenticated, postDeleteProduct);

module.exports = router;
