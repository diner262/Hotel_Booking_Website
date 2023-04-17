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
                res.render('admin/customer_manage', {
                    title: 'Manage Customer',
                    layout: 'admin-main',
                    customers: customers,
                });
            })
            .catch(err => {
                return next(err);
            });
    }

    async customer_detail(req, res, next) {
        const username = req.params.username;
        const filter = { username: username };
        
        await User.findOne(filter).exec()
            .then(customer => {
                res.render('admin/customers/customer_detail', {
                    title: 'Customer Detail',
                    layout: 'admin-main',
                    customer: customer
            });
        });
    }

    async customer_edit(req, res, next) {
        const username = req.params.username;
        const filter = { username: username };
        
        await User.findOne(filter).exec()
            .then(customer => {
                res.render('admin/customers/customer_edit', {
                    title: 'Edit Customer',
                    layout: 'admin-main',
                    customer: customer
            });
        });
    }

    async update_customer(req, res, next) {
        const username = req.params.username;
        const filter = { username: username };
        
        await User.findOneAndUpdate(filter, req.body, { new: true }).exec()
            .then(customer => {
                req.flash('success', 'Cập nhật thông tin thành công!');
                res.redirect('/admin/customer');
            });
    }
}

module.exports = new AdminController();