const db = require("../models");
const User = db.user;

exports.getUser = async (req,res) => {
  const id = req.params.id
  try {
    const user = await User.findByPk(id, {
      include:{
        model: account,
      }
    })
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message }); 
  }
}

//  delete should cascade and delete all categories, transactions and accounts
exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    await User.delete({where:{id : id}})
    res.status(200).send("Successful Deletion!")
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}