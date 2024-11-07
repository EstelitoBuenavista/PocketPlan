module.exports = (app) => {
    const user = require("../controllers/user");
    let router = require("express").Router();
  
    router.post("/register", user.register);
  
    app.use("/category", router);
  };