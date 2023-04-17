var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get('/login', adminController.login);
router.get('/', adminController.index);
router.get('/profile', adminController.profile);

module.exports = router;

