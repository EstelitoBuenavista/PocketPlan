const authenticateToken = require("../middleware/authToken");

module.exports = (app) => {
    const transaction = require("../controllers/transaction");
    let router = require("express").Router();
  
    router.post("/", transaction.create);
    router.get("/account/:id", transaction.getAccountTransactions)
    router.get("/category/:id", transaction.getCategoryTransactions)
    router.get("/user/:id", transaction.getUserTransactions)
    router.delete("/:id", transaction.delete)
    router.put("/:id", transaction.update)
  
    app.use("/transaction",authenticateToken, router);
  };