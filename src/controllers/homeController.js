var passport = require('passport');
var bcrypt = require('bcrypt');
var User = require('../models/user.model');
var { validationResult, matchedData } = require('express-validator');

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
    room(req, res, next) {
        res.render('client/room', {
            title: 'Room'
        });
    }
    

    async regiterNewUser(req, res, next) {
        let error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(422).json({
                code: 1,
                message: error.array()[0].msg
            });
        }

        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const existUsername = await User.findOne({ username: username }).exec();
        if (existUsername) {
            return res.status(409).json({
                code: 1,
                message: 'Tên người dùng đã tồn tại'
            });
        }

        const existEmail = await User.findOne({ email: email }).exec();
        if (existEmail) {
            return res.status(409).json({
                code: 1,
                message: 'Email đã tồn tại'
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
            return res.status(200).json({
                code: 0,
                message: 'Đăng ký tài khoản thành công!',
                user: user
            });
        } catch (err) {
            return res.status(500).send({
                code: 1,
                message: err.message
            });
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