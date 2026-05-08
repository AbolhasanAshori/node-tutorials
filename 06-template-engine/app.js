const express = require("express");
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("node:path");
const { engine } = require("express-handlebars");

express()
  .engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts",
      defaultLayout: "main-layout",
      extname: "hbs",
    }),
  )
  .set("view engine", "hbs")
  .set("views", "views")

  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, "public")))

  .use("/admin", adminData.routes)
  .use(shopRoutes)

  .use((_req, res) => {
    res.status(404).render("not-found", { title: "Not Found" });
  })

  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
