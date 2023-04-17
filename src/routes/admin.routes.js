var express = require('express');
var router = express.Router();
var { ensureAuth, forwardAuth } = require('../middlewares/authAdmin');
var { validateLogin, handleLoginAdmin } = require('../middlewares/validateForm');
var adminController = require('../controllers/adminController');


router.get('/profile/:id',adminController.profile);

router.post('/login', validateLogin(), handleLoginAdmin, adminController.authenticateLogin);

router.get('/login', forwardAuth, adminController.login);
router.get('/logout', adminController.logout);

router.get('/customer', ensureAuth, adminController.customer_manage);
router.get('/room', ensureAuth, adminController.room_manage);
router.get('/order', ensureAuth, adminController.order_manage);
router.get('/dashboard', ensureAuth, adminController.dashboard);

router.get('/', (req, res) => {
    res.redirect('dashboard');
});

module.exports = router;

