function getNotFound(req, res) {
  res.status(404).render("not-found", { title: "Not Found", isAuthenticated: req.session.isLoggedIn });
}

module.exports = {
  getNotFound,
};
