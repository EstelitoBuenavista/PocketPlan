module.exports = (app) => {
    const account = require("../controllers/account");
    let router = require("express").Router();
  
    router.post("/user/:id", account.getUserAccounts);
    router.post("/", account.create)
    router.delete("/:id", account.delete)
  
    app.use("/account", router);
  };