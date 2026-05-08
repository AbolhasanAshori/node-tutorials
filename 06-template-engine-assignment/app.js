const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");

const port = 3000;
const products = [];

express()
  .engine("hbs", engine({ extname: "hbs" }))
  .set("view engine", "hbs")
  .set("views", "views")

  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, "public")))

  .get("/", (req, res) => {
    res.render("home", {
      title: "Welcome",
      path: req.path,
      config: { activePath: { home: true }, css: { forms: true } },
    });
  })
  .get("/users", (req, res) => {
    res.render("user", {
      title: "Users",
      path: req.path,
      config: { activePath: { user: true } },
      products,
      hasProducts: products.length > 0,
    });
  })
  .post("/add-user", (req, res) => {
    products.push({ title: req.body.title });
    res.redirect("/users");
  })

  .use((_req, res) => {
    res.status(404).render("404", { title: "Not Found", path: "*" });
  })

  .listen(port, () => {
    console.log("Server running at http://localhost:3000");
  });
