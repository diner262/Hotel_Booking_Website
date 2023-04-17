var passport = require('passport');
var User = require('../models/user.model');


class AdminController {

    login(req, res, next) {
        res.render('admin/login', {
            title: 'Login Dashboard',
            layout: false,
            username: '',
            password: ''
        });
    }

    authenticateLogin(req, res, next) {
        passport.authenticate('local', {
            failureRedirect: '/admin/login?error',
            failureFlash: true,
        })(req, res, next => {
            req.flash('success', 'Đăng nhập tài khoản thành công!');
            res.redirect('/admin/dashboard');
        });
    }

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.flash('success', 'Đăng xuất tài khoản thành công!');
            res.redirect('./login');
        });
    }

    dashboard(req, res, next) {
        res.render('admin/dashboard', {
            title: 'Dashboard',
            layout: 'admin-main',
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

    async customer_manage(req, res, next) {
        await User.find({ role: 'client' }).exec()
            .then(customers => {
                // console.log(customer);
                res.render('admin/customer_manage', {
                    title: 'Manage Customer',
                    layout: 'admin-main',
                    customers: customers
                });
            })
            .catch(err => {
                return next(err);
            });
    }

    async customer_detail(req, res, next) {
        const id = req.params.id;
        console.log(id);
        
        await User.findById(id).exec()
            .then(customer => {
                // console.log(customer);
                res.render('admin/customers/customer_detail', {
                    title: 'Customer Detail',
                    layout: 'admin-main',
                    customer: customer
            });
        });
    }
}

module.exports = new AdminController();