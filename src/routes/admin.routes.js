var express = require('express');
var router = express.Router();
var { validationResult, matchedData } = require('express-validator');
var { ensureAuth, forwardAuth } = require('../middleware/authAdmin');
var { validateLogin } = require('../middleware/validateForm');
var adminController = require('../controllers/adminController');

validateForm = (req, res, next) => {
    const data = matchedData(req);
    let error = validationResult(req)
    if (!error.isEmpty()) {
        req.flash('error', error.array()[0].msg);

        return res.render('admin/login', {
            title: 'Login Dashboard',
            layout: false,
            username: data.username,
            password: data.password,
            messageFailure: req.flash('error'),
        });
    }
    return next();
}

router.post('/login', validateLogin(), validateForm, adminController.authenticateLogin);

router.get('/login', adminController.login);
router.get('/logout', adminController.logout);

router.get('/customer', ensureAuth, adminController.customer_manage);
router.get('/room', ensureAuth, adminController.room_manage);
router.get('/order', ensureAuth, adminController.order_manage);
router.get('/dashboard', ensureAuth, adminController.dashboard);

router.get('/', forwardAuth, (req, res) => {
    res.redirect('dashboard');
});




module.exports = router;

