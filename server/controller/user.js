const { User } = require("../models");

exports.register = async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const user = await User.create({ username, password, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }