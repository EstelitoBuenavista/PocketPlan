const db = require("../models")
const Account = db.account

exports.getUserAccounts = async (req, res) => {
    const id = req.params.id

    try {
      const accounts = await Account.findAll({where:{user_id : id}})
      res.status(201).send(accounts);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  exports.create = async (req, res) => {
    const newAccount =  req.body

    try {
      const account = await Account.create(newAccount)
      res.status(200).send(account)
    } catch (error) {
      res.status(500).send({error: error.message})
    }
  }

exports.delete = async (req, res) => {
  const id = req.params.id
  try {
    await Account.destroy({where:{id : id}})
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}

exports.update = async (req, res) => {
  const id = req.params.id 

  try {
    const account = await Account.destroy({where:{id : id}})
    res.status(201).send(account)
  } catch (error) {
    res.status(500).send({error: error.messager})
  } 
}