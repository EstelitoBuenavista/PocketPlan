const authenticateToken = require("../middleware/authToken");

module.exports = (app) => {
    const account = require("../controllers/account");
    let router = require("express").Router();
  
    router.get("/usertotal/:id", account.getTotalBalance);
    router.get("/user/:id", account.getUserAccounts);
    router.post("/", account.create);
    router.delete("/:id", account.delete);
    router.patch("/:id", account.update);
  
    app.use("/account",authenticateToken, router);
  };