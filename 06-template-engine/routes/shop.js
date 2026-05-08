const express = require("express");
const adminData = require("./admin");

const router = express.Router();

router.get("/", (_req, res) => {
  const { products } = adminData;
  res.render("shop", {
    title: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    products,
    config: {
      css: { product: true },
      activePath: { shop: true },
    },
  });
});

module.exports = router;
