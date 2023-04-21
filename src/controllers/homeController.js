var passport = require('passport');
var bcrypt = require('bcrypt');
var User = require('../models/user.model');
var Room = require('../models/room.model');
var BookRoom = require('../models/bookroom.model');
var RoomType = require('../models/room_type.model');

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
        })(req, res, next);
    }

    signup(req, res, next) {
        res.render('client/signup', {
            title: 'Signup',
            layout: false,
        });
    }
    async room(req, res, next) {
        try {
            const room = await Room.find();
            res.render('client/room', {
                title: 'Room',
                rooms: room
            });
        } catch (err) {
            console.log("Error:", err);
            next(err);
        }

    }
    async bookroom(req, res, next) {
        const roomid = req.params.id;

        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        });

        try {
            const room = await Room.findOne({ room_code: roomid });;
            res.render('client/bookroom', {
                title: 'Book now',
                room: room,
                room_types: types
            });
        } catch (err) {
            console.log("Error:", err);
            next(err);
        }

    }
    async bookroomSucess(req, res, next) {
        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        });

        try {
            const id = req.params.id;
            const {checkin, checkout, adults, children,fullname,email,phone,note,status,room_type,price} = req.body;
            const newBooking = new BookRoom({
                room_code: id,
                room_type: room_type,
                price: price,
                status: status,
                adult: adults,
                children: children,
                checkin: new Date(checkin),
                checkout: new Date(checkout),
                fullname: fullname,
                email: email,
                phone: phone,
                note: note
            });
            await newBooking.save();
            
            res.render('client/bill', {
                title: 'Bill',
                nameBill: "Đặt phòng thành công",
                billId: newBooking.book_id,
                checkin: checkin,
                checkout: checkout,
                name: fullname,
                email: email,
                phone: phone,
                room_type: room_type,
                roomid : id,
                adults: adults,
                children: children,
                note: note,
                price: price,
                room_types: types
            });
        } catch (error) {
            console.log("Error:", error);
            res.status(500).json({ error: "Server error" });
        }

    }
    detail(req, res, next) {
        res.render('client/detailroom', {
            title: 'Detail'
        });
    }

    bill(req, res, next) {
        res.render('client/bill', {
            title: 'Bill'
        });
    }
    history(req, res, next) {
        res.render('client/history', {
            title: 'Lịch sử đặt'
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