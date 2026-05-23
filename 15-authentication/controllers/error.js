function getNotFound(_req, res) {
  res.status(404).render("not-found", { title: "Not Found" });
}

module.exports = {
  getNotFound,
};
