const dbConfig = require("../config/config.js");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false,
  },
});

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};


// db.category = require("./category.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
// db.account = require("./account.js")(sequelize, Sequelize);
// db.transaction = require("./transaction.js")(sequelize, Sequelize);

// db.user.hasMany(db.account, { foreignKey: "user_id" });
// db.account.belongsTo(db.user,);

// db.user.hasMany(db.category, { foreignKey: "user_id" });
// db.category.belongsTo(db.user);

// db.account.hasMany(db.transaction, { foreignKey: "account_id" });
// db.transaction.belongsTo(db.account);

// db.category.hasMany(db.transaction, { foreignKey: "category_id" });
// db.transaction.belongsTo(db.category);

module.exports = db;
