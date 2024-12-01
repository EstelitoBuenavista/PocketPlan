module.exports = (app) => {
    const category = require("../controllers/category");
    let router = require("express").Router();
  
    router.get("/:id", category.getUserCategories);
    router.post("/", category.create)
    router.delete("/:id", category.delete)
    router.put("/:id", category.update)

    app.use("/category", router);
  };