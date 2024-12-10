const db = require("../models")
const Category = db.category

exports.getUserCategories= async (req, res) => {
    const id = req.params.id

    try {
      const categories = await Category.findAll({where:{user_id : id}})
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

exports.create = async (req, res) =>  {
  const newCategory = req.body

  try {
    const category = await Category.create(newCategory)
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    await Category.delete({where:{id : id}})
    res.status(200).send("Successful Deletion!")
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.update = async (req, res) => {
  const id = req.params.id
  let data = req.body

  try {
    const category = Category.update(data, {where:{id : id}})
    res.status(200).send(category)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}