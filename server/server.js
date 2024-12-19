require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const config = require('./config/config.js')[process.env.NODE_ENV || 'development'];
const path = require('path');
var cors = require("cors");
const db = require("./models");
const Sequelize = require('sequelize')
const DBname = config.database

const sequelizeAdmin = new Sequelize('mysql', config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  });


const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;


require("./routes/user")(app);
require("./routes/category")(app);
require("./routes/transaction")(app);
require("./routes/account")(app);
require("./routes/auth")(app);



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


sequelizeAdmin.query(`CREATE DATABASE IF NOT EXISTS ${DBname}`)
    .then(() => {
        console.log('Database created or already exists.');
        // Now you can sync your models
        db.sequelize.sync( {alter : true} ) //Remove alter when development is done
            .then(() => {
                console.log('Models synced successfully.');
            })
            .catch(err => {
                console.error('Error syncing database:', err);
            });
    })
    .catch(err => {
        console.error('Error creating database:', err);
    });