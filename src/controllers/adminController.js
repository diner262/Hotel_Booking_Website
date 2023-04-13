
var User = require('../models/user.model');


class AdminController {

    login(req, res, next) {
        res.render('admin/login', {
            title: 'Login Dashboard',
            layout: false
        });
    }

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.flash('messageSuccess', 'Đăng xuất tài khoản thành công!');
            res.redirect('./login');
        });
    }

    dashboard(req, res, next) {
        res.render('admin/dashboard', {
            title: 'Dashboard',
            layout: 'admin-main',
            messageSuccess: req.flash('messageSuccess'),
            user: req.user
        });
    }

    room_manage(req, res, next) {
        res.render('admin/room_manage', {
            title: 'Manage Room',
            layout: 'admin-main'
        });
    }

    order_manage(req, res, next) {
        res.render('admin/order_manage', {
            title: 'Manage Order',
            layout: 'admin-main'
        });
    }

    customer_manage(req, res, next) {
        res.render('admin/customer_manage', {
            title: 'Manage Customer',
            layout: 'admin-main'
        });
    }
}

module.exports = new AdminController;