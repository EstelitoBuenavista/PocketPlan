module.exports = (app) => {
  const user = require("../controllers/user");
  let router = require("express").Router();

  router.post("/register", user.register);
  router.get("/", user.getAllUsers);

  app.use("/user", router);
};