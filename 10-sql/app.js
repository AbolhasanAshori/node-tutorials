require("dotenv").config();
const express = require("express");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const path = require("node:path");
const { engine } = require("express-handlebars");
const { getNotFound } = require("./controllers/error");

express()
  .engine(
    "hbs",
    engine({
      layoutsDir: "views/layouts",
      partialsDir: "views/partials",
      defaultLayout: "main-layout",
      extname: "hbs",
    }),
  )
  .set("view engine", "hbs")
  .set("views", "views")

  .use(express.urlencoded())
  .use(express.static(path.join(__dirname, "public")))

  .use("/admin", adminRoutes)
  .use(shopRoutes)

  .use(getNotFound)

  .listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
