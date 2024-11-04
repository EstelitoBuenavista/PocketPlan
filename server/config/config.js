module.exports = {
  development: {
    username: 'root',
    password: 'pass',
    database: 'pocketplan_db',
    host: 'db',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: 'pass',
    database: 'database_test',
    host: 'db',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: 'pass',
    database: 'database_production',
    host: 'db',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

// module.exports = {
//   development: {
  // username: "root",
  // password: "",
  // database: "pocketplan",
  // host: 'localhost',
//   username: process.env.DB_USER || 'root',
//   password: process.env.DB_PASSWORD || 'pass',
//   database: process.env.DB_NAME || 'pocketplan_db',
//   host: process.env.DB_HOST || 'localhost',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// },
// };
