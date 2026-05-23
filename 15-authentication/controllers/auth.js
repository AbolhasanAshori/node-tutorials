const { User } = require("../models");
const bcrypt = require("bcryptjs");

/** @type {import('../middleware').ExpressMiddleware} */
function getLogin(_req, res) {
  res.render("auth/login", {
    title: "Login",
    config: {
      activePath: { login: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postLogin(req, res) {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.redirect("/login");

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) return res.redirect("/login");

          req.session.isLoggedIn = true;
          req.session.userId = user.id;
          return req.session.save((err) => {
            if (err) console.error(err);
            res.redirect("/");
          });
        })
        .catch(console.error);
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
function getSignup(_req, res) {
  res.render("auth/signup", {
    title: "Signup",
    config: {
      activePath: { signup: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postSignup(req, res) {
  const { email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) return res.redirect("/signup");

  User.findOne({ email }).then((userDoc) => {
    if (userDoc) return res.redirect("/signup");

    return bcrypt
      .hash(password, 12)
      .then((hashedPass) => {
        const user = new User({
          email,
          password: hashedPass,
          cart: { items: [] },
        });
        return user.save();
      })
      .then(() => {
        res.redirect("/login");
      })
      .catch(console.error);
  });
}

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
};
