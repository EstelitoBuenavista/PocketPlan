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
        const transactions = await Transaction.findAll({where:{category_id : id}})
        if (transactions){
          res.status(201).send(transactions)
        } else  {
          res.status(404).send({error : "No Records Found"})
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

exports.create = async (req, res) => {
  const newTransaction = req.body;
  

  try {
    // Create the transaction
    const transaction = await Transaction.create(newTransaction);
    const amountChange = transaction.amount;
    
    if (transaction.type === 'expense') {
      amountChange = -transaction.amount;  
    }

    const account = await Account.increment('balance', {where: {id : newTransaction.account_id, }, by : amountChange});

    // Check if the account exists
    if (!account) {
      return res.status(404).send({ error: 'Account not found' });
    }

    res.status(201).send(transaction);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  const id = req.params.id

  try {
    await Transaction.delete({where:{id : id}})
    res.status(200).send("Successful Deletion!")
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}

exports.update = async (req, res) => {
  const id = req.params.id
  let data = req.body

  try {
    const transaction = await Transaction.update(data,{where:{id : id}})
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}