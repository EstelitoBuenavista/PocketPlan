// module.exports = (app) => {
//     // const user = require("../controllers/user.controller");
//     let router = require("express").Router();
  
//     //router.post("/", user);
  
//     app.use("/api/users", router);
//   };

const express = require('express');
const router = express.Router();
const { User } = require('../models');

router.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;