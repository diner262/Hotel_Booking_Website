var express = require('express');
var router = express.Router();
var { ensureAuth, forwardAuth } = require('../middleware/authAdmin');
var adminController = require('../controllers/adminController');

// function isAdmin(req, res, next) {
//     if (req.isAuthenticated() && req.user.role === 'ADMIN_ROLE') {
//         return next();
//     }
//     res.redirect('/admin/login');
// }

router.post('/login', adminController.login_post);

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

