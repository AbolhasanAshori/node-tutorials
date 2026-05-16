require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { getNotFound } = require("./controllers/error");
const sequelize = require("./util/database");
const { User, Cart, Product, CartItem, Order, OrderItem } = require("./models");
const { adminRoutes, shopRoutes } = require("./routes");

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

User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  .authenticate()
  .then(() => {
    console.log("DBConnection has been established successfully.");
    return sequelize.sync();
    // return sequelize.sync({ force: true });
  })
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (user) {
      return user;
    }
    return User.create({ name: "Max", email: "test@example.com" });
  })
  .then((user) => {
    return Promise.all([Promise.resolve(user), Cart.findByPk(1)]);
  })
  .then(([user, cart]) => {
    if (cart) return cart;
    return user.createCart();
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
