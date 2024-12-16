const authenticateToken = require("../middleware/authToken");
const {  } = require("../middleware/authToken");

module.exports = (app) => {
  const user = require("../controllers/user");
  let router = require("express").Router();

  router.get("/:id", user.getUser);
  router.delete("/:id", user.delete)
  router.put("/:id",user.update)
  router.get("/pie/:id/:account_id", user.pieChartData)
  router.get("/daily/:id", user.dailyExpenseChartData)
  router.get("/mixbar/:id/:account_id", user.getMixBarChart)

  app.use("/user",authenticateToken, router);
};