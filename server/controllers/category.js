const db = require("../models")
const Category = db.account

exports.getUserCategories= async (req, res) => {
    const id = req.params.id

    try {
      const categories = await Category.findAll({where:{user_id : id}})
      res.status(201).json(categories.name);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
