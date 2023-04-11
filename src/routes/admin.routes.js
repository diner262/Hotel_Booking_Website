var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get('/login', adminController.login);
router.get('/', adminController.index);


module.exports = router;

