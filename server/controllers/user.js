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
        raw: true
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
          'account_id',
          'transaction_date'
        ],
        include: [
          {
            model: Account,
            attributes: [], 
            where: { user_id: id }, 
          }
        ],
        group: [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), 'account_id','transaction_date'], // Group by day
        // order: [[sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), 'ASC']], // Order by date
        order: [['transaction_date', 'ASC']],
        raw: true,
        logging: console.log,
      });

      const aggregatedResults = results.reduce((acc, result) => {
        const date = result.dailyTotal;
        const accountId = result.account_id;
        const key = `${date}_${accountId}`;
        if (!acc[key]) {
          acc[key] = {
            date: date,
            income: 0,
            expenses: 0,
            amt: 0,
            account_id: accountId
          };
        }
        acc[key].income += parseFloat(result.income);
        acc[key].expenses += parseFloat(result.expenses);
        acc[key].amt += parseFloat(result.amt);
        return acc;
      }, {});

    const formattedResults = Object.values(aggregatedResults);
    console.log(formattedResults);

      res.status(200).send(formattedResults);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
}

exports.getMixBarChart = async (req, res) => {
  const {id, account_id} = req.params
  const condition = account_id != 0 ? {account_id:account_id} : {}

  try {
    const results = await Transaction.findAll({
      where: condition,
      attributes: [
        [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), 'date'], // Format date as 'Dec 6'
        [sequelize.fn('SUM', sequelize.literal(`CASE WHEN transaction.type = 'expense' THEN transaction.amount ELSE 0 END`)), 'total_expenses'],
        'category_id',
        'transaction_date' // Group by category
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
        sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), // Group by date
        'category_id',
        'transaction_date'
      ],
      order: [
        // [sequelize.fn('DATE_FORMAT', sequelize.col('transaction_date'), '%b %e'), 'ASC']
        ['transaction_date', 'ASC']

      ],
      raw: true
    });

    const aggregatedData = {};

    results.forEach(result => {
      const { date } = result;
      const categoryName = result['Category.name'];
      const totalExpenses = parseFloat(result.total_expenses) || 0;

      if (!aggregatedData[date]) {
        aggregatedData[date] = {
          date: date,
          transactions: []
        };
      }

      aggregatedData[date].transactions.push({
        category: categoryName,
        value: totalExpenses
      });
    });


    // const formattedResults = results.map(result => {
    //    return {
    //      date: result.dataValues.date, 
    //      transactions: [{
    //        category: result.dataValues.Category.name,
    //        value: result.dataValues.total_expenses, 
    //      }],
    //    };
    //  });
    const formattedResults = Object.values(aggregatedData);

     console.log(results)
     console.log(formattedResults)

    res.status(200).send(formattedResults);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
