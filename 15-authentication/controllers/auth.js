const { User } = require("../models");

/** @type {import('../middleware').ExpressMiddleware} */
function getLogin(req, res) {
  res.render("auth/login", {
    title: "Login",
    isAuthenticated: req.session.isLoggedIn,
    config: {
      activePath: { login: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postLogin(req, res) {
  User.findById("5baa2528563f16379fc8a610")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.userId = user.id;
      req.session.save((err) => {
        if (err) console.error(err);
        res.redirect("/");
      });
    })
    .catch(console.error);
}

/** @type {import('../middleware').ExpressMiddleware} */
function postLogout(req, res) {
  req.session.destroy((err) => {
    if (err) console.error(err);

    res.redirect("/");
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function getSignup(req, res) {
  res.render("auth/signup", {
    title: "Signup",
    isAuthenticated: req.session.isLoggedIn,
    config: {
      activePath: { signup: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postSignup(_req, _res) {}

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};
