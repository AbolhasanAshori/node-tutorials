function getLogin(_req, res) {
  res.render("auth/login", {
    title: "Login",
    path: "/login",
    config: {
      activePath: { login: true },
      css: { forms: true, auth: true },
    },
  });
}

module.exports = {
  getLogin,
};
