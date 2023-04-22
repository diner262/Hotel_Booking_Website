var express = require('express');
var router = express.Router();
var { ensureAuth, forwardAuth, accountAuth} = require('../middlewares/authAdmin');
var { validateLogin, handleLoginAdmin } = require('../middlewares/validateForm');
var adminController = require('../controllers/adminController');

// router.get('/profile/:id',adminController.profile);

router.post('/login', validateLogin(), handleLoginAdmin, adminController.authenticateLogin, accountAuth);

router.get('/login', forwardAuth, adminController.login);
router.get('/logout', adminController.logout);

// CRUD customers
router.get('/customers', ensureAuth, adminController.customer_manage);
router.get('/customers/:username', ensureAuth, adminController.customer_detail);
router.get('/customers/update/:username', ensureAuth, adminController.customer_edit);
router.post('/customers/update/:username', ensureAuth, adminController.update_customer);
router.delete('/customers/delete/:id', ensureAuth, adminController.delete_customer);

// CRUD room hotel
router.get('/rooms', ensureAuth, adminController.room_manage);
router.get('/rooms/create', ensureAuth, adminController.room_create);
router.post('/rooms/create', ensureAuth, adminController.create_room);
router.get('/rooms/update/:room_code', ensureAuth, adminController.room_edit);
router.post('/rooms/update/:room_code', ensureAuth, adminController.update_room);
router.delete('/rooms/delete/:id', ensureAuth, adminController.delete_room);

router.get('/room_types', ensureAuth, adminController.room_type_manage);
router.post('/room_types', ensureAuth, adminController.create_room_type);
router.post('/room_types/update/:id', ensureAuth, adminController.update_room_type);

// Order and Dashboard
router.get('/rooms/room_codes/:floor', ensureAuth, adminController.getCodeRoom);

router.get('/orders', ensureAuth, adminController.order_manage);
router.get('/dashboard', ensureAuth, adminController.dashboard);
router.get('/calendar', ensureAuth, adminController.calendar);

router.get('/', (req, res) => {
    res.redirect('dashboard');
});

module.exports = router;

