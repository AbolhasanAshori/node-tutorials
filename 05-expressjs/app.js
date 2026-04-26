const express = require("express");
const bodyParser = require("body-parser");

express()
  .use(bodyParser.urlencoded())
  .use("/add-product", (_req, res) => {
    res.send(
      '<form action="/product" method="POST"><input type="text" name="title" /><button type="submit">Save</button></form>',
    );
  })
  .use("/product", (req, res) => {
    console.log(req.body);
    res.redirect("/");
  })
  .use("/", (_req, res) => {
    res.send("<h1>Hello from Express!</h1>");
  })
  .listen(3000);
