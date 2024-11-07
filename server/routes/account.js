module.exports = (app) => {
    const user = require("../controller/user");
    let router = require("express").Router();
  
    router.post("/register", user.register);
  
    app.use("/account", router);
  };