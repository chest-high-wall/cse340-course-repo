
const showHomePage = (req, res) => {
  res.render("index", { title: "Home" });
};

export { showHomePage };
