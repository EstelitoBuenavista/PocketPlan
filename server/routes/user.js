module.exports = (app) => {
    // const user = require("../controllers/user.controller");
    let router = require("express").Router();
  
    //router.post("/", user);
  
    app.use("/api/users", router);
  };