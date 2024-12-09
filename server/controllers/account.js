const db = require("../models")
const Account = db.account
const Transaction = db.transaction

exports.getTotalBalance = async (req, res) => {
  const id = req.params.id;

  try {
    // Sum all account balances for the user
    const balance = await Account.sum('balance', { where: { user_id: id } });

    // Find all transactions of type 'expense' for the user's accounts
    let expenses = await Transaction.sum('amount', {
      where: { type: 'expense' },
      include: {
        model: Account,
        where: { user_id: id }, // Filter by user ID through the account
        attributes: [], // Don't fetch Account details
      },
    });

    expenses = expenses || 0

    res.status(200).send({ balance, expenses });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


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