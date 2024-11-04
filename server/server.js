require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config/config.js')[process.env.NODE_ENV || 'development'];
const path = require('path');
var cors = require("cors");
const db = require("./models");
const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(config.database, config.username, config.password, config);
// const { sequelize } = require('./models'); // Adjust the path as necessary



const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const userRoutes = require('./routes/user');


// Test connectivity
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// Test end
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// require("./routes/user")(app);
// require("./routes/category")(app);
// require("./routes/transaction")(app);
// require("./routes/account")(app);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });