require("dotenv").config();
const path = require("node:path");
const express = require("express");
const { engine } = require("express-handlebars");
const { default: mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const { getNotFound } = require("./controllers/error");
const { adminRoutes, shopRoutes, authRoutes } = require("./routes");
const { authenticateUser, populateLocals } = require("./middleware/auth");
const { createDbConnectionUri } = require("./util/database");
const csrf = require("csurf");

const MONGODB_URI = createDbConnectionUri({
  hostname: process.env.DB_HOST ?? "127.0.0.1",
  port: process.env.DB_PORT ?? 27017,
  dbName: process.env.DB_NAME ?? "test",
  dbType: process.env.DB_TYPE ?? "mongodb",
});

const app = express();
const store = MongoStore.create({
  mongoUrl: MONGODB_URI,
  collectionName: "sessions",
  ttl: 1000 * 60 * 60 * 24 * 14,
});
const csrfProtection = csrf();

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
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  }),
);
app.use(csrfProtection);
app.use(authenticateUser);
app.use(populateLocals);

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(getNotFound);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Successfully connected to MongoDB using Mongoose!");

    app.listen(3000, () => {
      console.log("Server running at http://localhost:3000");
    });
  })
  .catch(console.error);
