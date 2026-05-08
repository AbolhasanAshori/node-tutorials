const express = require("express");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("node:path");

express()
  .set("view engine", "ejs")
  .set("views", "views")

  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, "public")))

  .use("/admin", adminData.routes)
  .use(shopRoutes)

  .use((_req, res) => {
    res.status(404).render("not-found", { title: "Not Found", path: "*" });
  })

  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
