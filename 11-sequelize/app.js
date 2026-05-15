require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const { getNotFound } = require("./controllers/error");
const Product = require("./models/product");
const User = require("./models/user");
const sequelize = require("./util/database");

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
  User.findByPk(1)
    .then((user) => {
      Object.assign(req, {
        user,
      });
      next();
    })
    .catch((err) => next(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(getNotFound);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);

sequelize
  .authenticate()
  .then(() => {
    console.log("DBConnection has been established successfully.");
    return sequelize.sync();
  })
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Max", email: "test@example.com" });
    }
    return user;
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
