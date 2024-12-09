const db = require("../models");
const User = db.user;
const Category = db.category
const saltRounds = 8;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    let { username, password, email } = req.body;
    password = await bcrypt.hash(password, saltRounds);

    try {
      const user = await User.create({ username, password, email });
      await Category.create({user_id : user.id, name: "uncategorized"})
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

exports.login = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { username: username } });
  
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).send({ error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ userId: user.id }, 'secret', { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    } catch (error) {
      res.status(500).send({ error: 'Login failed' });
    }
  }
  
