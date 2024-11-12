const db = require("../models")
const Account = db.account

exports.getUserAccounts = async (req, res) => {
    const id = req.params.id

    try {
      const accounts = await Account.findAll({where:{account_id : id}})
      res.status(201).json(accounts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
