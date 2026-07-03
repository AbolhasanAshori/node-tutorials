const crypto = require("node:crypto");
const bcrypt = require("bcryptjs");
const { createTransport } = require("nodemailer");
const { User } = require("../models");
const { validationResult } = require("express-validator");

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/** @type {import('../middleware').ExpressMiddleware} */
function getLogin(req, res) {
  res.render("auth/login", {
    title: "Login",
    errorMessage: req.flash("error"),
    config: {
      activePath: { login: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postLogin(req, res) {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/login", {
      title: "Login",
      errorMessage: errors.array().map((err) => err.msg),
      formData: { email, password },
      config: {
        activePath: { login: true },
        css: { forms: true, auth: true },
      },
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }

      return bcrypt
        .compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            req.flash("error", "Invalid email or password.");
            return res.redirect("/login");
          }

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
function getSignup(req, res) {
  res.render("auth/signup", {
    title: "Signup",
    errorMessage: req.flash("error"),
    config: {
      activePath: { signup: true },
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postSignup(req, res) {
  const { email, password, confirmPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render("auth/signup", {
      title: "Signup",
      errorMessage: errors.array().map((err) => err.msg),
      formData: { email, password, confirmPassword },
      config: {
        activePath: { signup: true },
        css: { forms: true, auth: true },
      },
    });
  }

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
      return transporter.sendMail({
        to: email,
        from: "shop@node-tutorials.com",
        subject: "Signup successed!",
        html: "<h1>You successfully signed up!</h1>",
      });
    })
    .catch(console.error);
}

/** @type {import('../middleware').ExpressMiddleware} */
function getReset(req, res) {
  res.render("auth/reset", {
    title: "Reset Password",
    errorMessage: req.flash("error"),
    config: {
      css: { forms: true, auth: true },
    },
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function postReset(req, res) {
  const { email } = req.body;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.error(err);
      res.redirect("/reset");
    }

    const token = buffer.toString("hex");
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account found with the provided credentials.");
          res.redirect("/reset");
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3_600_000;
        return user.save();
      })
      .then(() => {
        const baseUrl = `${req.protocol}://${req.get("host")}`;
        const url = new URL(`/reset/${token}`, baseUrl);

        res.redirect("/");
        if (process.env.NODE_ENV !== "production") {
          console.info(`Click the following link to validate the reset password token: ${url.toString()}`);
        }

        return transporter.sendMail({
          to: email,
          from: "shop@node-tutorials.com",
          subject: "Password Reset",
          html: `
            <p>You requested a password reset</p>
            <p>click this <a href="${url.toString()}">Link</a> to set a new password</p>
          `,
        });
      })
      .catch(console.error);
  });
}

/** @type {import('../middleware').ExpressMiddleware} */
function getNewPassword(req, res) {
  const { token } = req.params;

  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      if (!user) {
        req.flash("error", "No account found with the provided credentials.");
        res.redirect("/reset");
      }

      res.render("auth/new-password", {
        title: "New Pasword",
        errorMessage: req.flash("error"),
        userId: user._id.toString(),
        passwordToken: token,
        config: {
          css: { forms: true, auth: true },
        },
      });
    })
    .catch(console.error);
}

/** @type {import('../middleware').ExpressMiddleware} */
function postNewPassword(req, res) {
  const { password: newPassword, confirmPassword, passwordToken, userId } = req.body;

  if (newPassword !== confirmPassword) {
    req.flash("error", "The password and confirm password fields do not match.");
    res.redirect(`/reset/${passwordToken}`);
  }

  User.findOne({ _id: userId, resetToken: passwordToken, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      return Promise.all([user, bcrypt.hash(newPassword, 12)]);
    })
    .then(([user, hashedPass]) => {
      user.password = hashedPass;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;

      return user.save();
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch(console.error);
}

module.exports = {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
};
