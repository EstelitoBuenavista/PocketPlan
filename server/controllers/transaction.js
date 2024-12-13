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
    
    if (transaction.type === 'expense' || transaction.type === 'Expense') {
      await Account.decrement('balance', {where: {id : newTransaction.account_id, }, by : transaction.amount});
      await Account.increment('expense', {where: {id : newTransaction.account_id, }, by : transaction.amount});
    } else {
      await Account.increment('balance', {where: {id : newTransaction.account_id, }, by : transaction.amount});
    }


    res.status(201).send(transaction);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


exports.delete = async (req, res) => {
  const id = req.params.id

  try {

    const transaction = await Transaction.findByPk(id)
    if (transaction.type === 'expense' || transaction.type === 'Expense') {
      await Account.increment('balance', {where: {id : transaction.account_id, }, by : transaction.amount});
      await Account.decrement('expense', {where: {id : transaction.account_id, }, by : transaction.amount});
    } else {
      console.log(transaction.type)
      await Account.decrement('balance', {where: {id : transaction.account_id, }, by : transaction.amount});
    }
  } catch (error) {
    res.status(500).send({error:error.message})
  }
  try {
    await Transaction.destroy({where:{id : id}})
    res.status(200).json("Successful Deletion!")
  } catch (error) {
    res.status(500).send({deletion_error:error.message})
  }
}

exports.update = async (req, res) => {
  const id = req.params.id
  let transaction = req.body

  try {
    const oldTransaction = await Transaction.findByPk(id)

    if(!oldTransaction){
      res.status(404).send({error:"not found"})
    }
    updatedTransaction = await Transaction.update(transaction, {where: { id : id } })
    const amountchange = oldTransaction.amount - transaction.amount // if positive then new amount is less, if negative then new amount is bigger

    if (transaction.type === 'expense' || transaction.type === 'Expense') {
      await Account.increment('balance', {where: {id : transaction.account_id, }, by : amountchange});
      await Account.decrement('expense', {where: {id : transaction.account_id, }, by : amountchange});
    } else {
      await Account.decrement('balance', {where: {id : transaction.account_id, }, by : amountchange});
    }

    res.status(200).send(updatedTransaction)
  } catch (error) {
    res.status(500).send({error:error.message})
  }
}