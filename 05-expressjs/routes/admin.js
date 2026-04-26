const express = require("express");

const router = express.Router();

router
  .get("/add-product", (_req, res) => {
    res.send(
      '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Save</button></form>',
    );
  })
  .post("/product", (req, res) => {
    console.log(req.body);
    res.redirect("/");
  });

module.exports = router;
