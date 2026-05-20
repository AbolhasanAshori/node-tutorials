require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { getNotFound } = require("./controllers/error");
const { adminRoutes, shopRoutes } = require("./routes");
const User = require("./models/user");
const { default: mongoose } = require("mongoose");

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

app.use((req, _res, next) => {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.user = new User({
        ...user,
        username: user.name,
        id: user._id.toString(),
      });
      next();
    })
    .catch(console.error);
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getNotFound);

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    console.log("Successfully connected to MongoDB using Mongoose!");
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(console.error);
