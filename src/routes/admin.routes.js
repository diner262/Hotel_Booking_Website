var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

/* GET home page. */
router.get('/login', adminController.login);

module.exports = router;

