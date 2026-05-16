require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { getNotFound } = require("./controllers/error");
const { adminRoutes, shopRoutes } = require("./routes");
const { mongoConnect } = require("./util/database");

const app = express();
app.engine(
  "hbs",
  engine({
    layoutsDir: "views/layouts",
    partialsDir: "views/partials",
    defaultLayout: "main-layout",
    extname: "hbs",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
  }),
);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getNotFound);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
  });
});
