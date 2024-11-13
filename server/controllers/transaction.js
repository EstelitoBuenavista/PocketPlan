const db = require("../models")
const Transaction = db.transaction
const Account = db.account
const User = db.user
const Category =  db.category

exports.getAccountTransactions = async (req, res) => {
    const id = req.params.id

    try {
      const transactions = await Transaction.findAll({where:{account_id : id}})
      res.status(201).json(transactions);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

exports.getUserTransactions = async (req, res) => {
    const id = req.params.id;
  
    try {
      const userWithTransactions = await User.findByPk(id, {
        include: {
          model: Account,
          include: {
            model: Transaction,
            include: {
                model: Category,
                attributes: ['name'], 
              },
          },
        },
      });
  
      if (!userWithTransactions) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const transactions = userWithTransactions.Accounts.flatMap(account => account.Transactions);
      
      res.status(200).json(transactions); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.getCategoryTransactions = async (req,res) => {
    const id = req.params.id;

    try {
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
