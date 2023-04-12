var express = require('express');
var router = express.Router();
var adminController = require('../controllers/adminController');

router.get('/login', adminController.login);
router.get('/customer', adminController.customer_manage);
router.get('/room', adminController.room_manage);
router.get('/order', adminController.order_manage);
router.get('/', adminController.home);


module.exports = router;

