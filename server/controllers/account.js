const db = require("../models")
const Account = db.account
const Transaction = db.transaction

exports.getTotalBalance = async (req, res) => {
  const id = req.params.id;

  try {
    const balance = await Account.sum('balance', { where: { user_id: id } });
    const expenses = await Account.sum('expense', { where: { user_id: id } });

    res.status(200).send({ balance, expenses });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


exports.getUserAccounts = async (req, res) => {
    const id = req.params.id

    try {
      const accounts = await Account.findAll({where:{user_id : id}})
      res.status(200).send(accounts);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  exports.create = async (req, res) => {
    const newAccount =  req.body

    try {
      const account = await Account.create(newAccount)
      res.status(201).send(account)
    } catch (error) {
      res.status(500).send({error: error.message})
    }
  }

// exports.delete = async (req, res) => {
//   const id = req.params.id
//   try {
//     await Account.destroy({where:{id : id}})
//   } catch (error) {
//     res.status(500).send({error: error.message})
//   }
// }
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCount = await Account.destroy({ where: { id: id } });

    if (deletedCount === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }

    res.status(200).send({ message: 'Account and associated transactions deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id 
  const updatedData = req.body;

  try {
    const account = await Account.update(updatedData, {
      where: { id: id }
    });

    if (account[0] === 0) {
      return res.status(404).send({ error: 'Account not found' });
    }

    res.status(200).send({ message: 'Account updated successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

