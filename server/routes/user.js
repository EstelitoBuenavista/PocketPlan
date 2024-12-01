module.exports = (app) => {
  const user = require("../controllers/user");
  let router = require("express").Router();

  router.get("/:id", user.getUser);
  router.delete("/:id", user.delete)

  app.use("/user", router);
};