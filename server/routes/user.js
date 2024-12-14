module.exports = (app) => {
  const user = require("../controllers/user");
  let router = require("express").Router();

  router.get("/:id", user.getUser);
  router.delete("/:id", user.delete)
  router.get("/pie/:id/:account_id", user.pieChartData)
  router.get("/daily/:id", user.dailyExpenseChartData)
  router.get("/mixBar/:id", user.getMixBarChart)

  app.use("/user", router);
};