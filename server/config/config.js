module.exports = {
  development: {
    username: process.env.DB_USER || 'root' ,
    password: process.env.DB_PASSWORD || '' ,
    database: process.env.DB_NAME || 'pocketplan_db',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'database_test',
    host: process.env.DB_HOST,
    dialect: 'mysql',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'database_production',
    host: process.env.DB_HOST,
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
