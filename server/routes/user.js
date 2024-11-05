const express = require('express');
const router = express.Router();
const user = require('../controller/user');

router.post('/register', user.register);

module.exports = router;