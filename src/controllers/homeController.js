var passport = require('passport');
var User = require('../models/user.model');

class HomeController {
    login(req, res, next) {
        res.render('client/login', {
            title: 'Login',
            layout: false,
            username: '',
            password: ''
        });
    }

    authenticateLogin(req, res, next) {
        passport.authenticate('local', {
            failureRedirect: '/login?error',
            failureFlash: true,
        })(req, res, next => {
            req.flash('success', 'Đăng nhập tài khoản thành công!');
            res.redirect('home');
        });
    }

    signup(req, res, next) {
        res.render('client/signup', {
            title: 'Signup',
            layout: false,
            // username: '',
            // password: ''
        });
    }

    logout(req, res, next) {
        req.logout(function (err) {
            if (err) { return next(err); }
            req.flash('success', 'Đăng xuất tài khoản thành công!');
            res.redirect('./home');
        });
    }

    home(req, res, next) {
        res.render('client/home', {
            title: 'Home Page',
            user: req.user
        });
    }


}

module.exports = new HomeController();