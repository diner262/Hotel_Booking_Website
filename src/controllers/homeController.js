var passport = require('passport');
var bcrypt = require('bcrypt');
var User = require('../models/user.model');
var { validationResult, matchedData } = require('express-validator');

class HomeController {
    login(req, res, next) {
        res.render('client/login', {
            title: 'Login',
            layout: false,
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
        });
    }
    room(req, res, next) {
        res.render('client/room', {
            title: 'Room'
        });
    }
    bookroom(req, res, next) {
        res.render('client/bookroom', {
            title: 'Book now'
        });
    }
    detail(req, res, next) {
        res.render('client/detailroom', {
            title: 'Detail'
        });
    }

    async regiterNewUser(req, res, next) {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        const existUsername = await User.findOne({ username: username }).exec();
        if (existUsername) {
            req.flash('error', 'Tên đăng nhập đã tồn tại.');
            return res.render('client/signup', {
                title: 'Signup',
                layout: false,
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password,
                messageFailure: req.flash('error')
            });
        }

        const existEmail = await User.findOne({ email: email }).exec();
        if (existEmail) {
            req.flash('error', 'Email đã tồn tại.');
            return res.render('client/signup', {
                title: 'Signup',
                layout: false,
                username: username,
                email: email,
                password: password,
                confirm_password: confirm_password,
                messageFailure: req.flash('error')
            });
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(password, salt);

        // Create new account
        const user = new User({
            username: username,
            email: email,
            password: encryptPassword,
            role: 'client'
        });

        // Save account
        try {
            await user.save();
            req.flash('success', 'Đăng ký tài khoản thành công!');
            res.redirect('./login');
        } catch (err) {
            req.flash('error', err.message);
            res.redirect('./signup');
        }
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