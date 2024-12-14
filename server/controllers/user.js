const db = require("../models");
const User = db.user;
const Account = db.account
const Category = db.category
const Transaction = db.transaction
const sequelize = db.Sequelize

exports.getUser = async (req,res) => {
  const id = req.params.id
  try {
    const user = await User.findByPk(id, {
      include:{
        model: Account,
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

exports.pieChartData = async (req, res) => {
  const {id, account_id} = req.params
  const condition = account_id != 0 ? {account_id:account_id} : {}
    try {
      const result = await Category.findAll({
        attributes: [
          'name',
          [sequelize.fn('SUM', sequelize.col('Transactions.amount')), 'value']
        ],
        include: [
          {
            model: Transaction,
            attributes: [],
            where: condition
          }
        ],
        where: { user_id: id },
        group: ['Category.name'],
      });

      res.status(200).send(result)
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

exports.dailyExpenseChartData = async (req, res) => {
  const id = req.params.id

    try {
      const results = await Transaction.findAll({
        attributes: [
          [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), 'dailyTotal'], // Format date as 'Dec 6'
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN Transaction.type = 'income' THEN amount ELSE 0 END`)), 'income'],
          [sequelize.fn('SUM', sequelize.literal(`CASE WHEN Transaction.type = 'expense' THEN amount ELSE 0 END`)), 'expenses'],
          [sequelize.fn('SUM', sequelize.col('amount')), 'amt'],
          'account_id'
        ],
        include: [
          {
            model: Account,
            attributes: [], 
            where: { user_id: id }, 
          }
        ],
        group: [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%Y-%m-%d')], // Group by day
        order: [[sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%Y-%m-%d'), 'ASC']] // Order by date
      });

      res.status(200).send(results)
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

exports.getMixBarChart = async (req, res) => {
  const id = req.params.id; // Get the user ID from the request parameters

  try {
    const results = await Transaction.findAll({
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), 'date'], // Format date as 'Dec 6'
        [sequelize.fn('SUM', sequelize.literal(`CASE WHEN transaction.type = 'expense' THEN transaction.amount ELSE 0 END`)), 'total_expenses'],
        'category_id' // Group by category
      ],
      include: [
        {
          model: Account,
          attributes: [], // Don't include unnecessary fields from Account
          where: { user_id: id }, // Filter Account by user_id
        },
        {
          model: Category,  // Assuming you have a Category model
          attributes: ['name'], // Fetch category names
        }
      ],
      group: [
        sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%Y-%m-%d'), // Group by date
        'category_id'
      ],
      order: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%Y-%m-%d'), 'ASC']
      ]
    });

    const formattedResults = results.map(result => {
       return {
         date: result.dataValues.date, 
         transactions: [{
           category: result.dataValues.Category.name,
           value: result.dataValues.total_expenses, 
         }],
       };
     });

     console.log(results)
     console.log(formattedResults)

    res.status(200).send(formattedResults);
    

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
