'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = require("./user.js")(sequelize, Sequelize);
db.account = require("./account.js")(sequelize, Sequelize);
db.category = require("./category.js")(sequelize, Sequelize);
db.transaction = require("./transaction.js")(sequelize, Sequelize);

db.transaction.belongsTo(db.account, { foreignKey: 'account_id' });
db.transaction.belongsTo(db.category, { foreignKey: 'category_id' });

db.account.belongsTo(db.user, { foreignKey: 'user_id' });
db.account.hasMany(db.transaction, { foreignKey: 'account_id' });

db.category.belongsTo(db.user, { foreignKey: 'user_id' });
db.category.hasMany(db.transaction, { foreignKey: 'category_id' });

db.user.hasMany(db.account, { foreignKey: 'user_id' });
db.user.hasMany(db.category, { foreignKey: 'user_id' });

module.exports = db;
