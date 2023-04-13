var express = require('express');
var passport = require('passport');
var router = express.Router();
var adminController = require('../controllers/adminController');

function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.role === 'ADMIN_ROLE') {
        return next();
    }
    res.redirect('/admin/login');
}

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin/dashboard',
        failureRedirect: '/admin/login?error',
        failureFlash: {
            type: 'messageFailure',
            message: 'Sai tên tài khoản hoặc mật khẩu.'
        },
        successFlash: {
            type: 'messageSuccess',
            message: 'Đăng nhập thành công!'
        }
    })(req, res, next);
});

router.get('/login', adminController.login);
router.get('/logout', adminController.logout);

router.get('/customer', isAdmin, adminController.customer_manage);
router.get('/room', isAdmin, adminController.room_manage);
router.get('/order', isAdmin, adminController.order_manage);
router.get('/dashboard', isAdmin, adminController.dashboard);

router.get('/', (req, res) => {
    res.redirect('dashboard');
});




module.exports = router;

