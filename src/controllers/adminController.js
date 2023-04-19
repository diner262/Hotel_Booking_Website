var passport = require('passport');
var multer = require('multer');
var dir_name = './public/uploads/avatar';
var User = require('../models/user.model');

//Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dir_name);
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar-' + req.params.username + '.' + file.originalname.split('.').pop());
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    let extension = file.originalname.split('.').pop();
    console.log(extension);
    // Get only file image
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

// Upload file
const upload = multer({
    storage: multerStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // save maximum size 5MB
    fileFilter: multerFilter
});

class AdminController {

    // Đăng nhập, đăng xuất tài khoản
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

    // Trang điều khiển
    dashboard(req, res, next) {
        res.render('admin/dashboard', {
            title: 'Dashboard',
            layout: 'admin-main',
            user: req.user
        });
    }

    // Trang quản lý phòng
    room_manage(req, res, next) {
        res.render('admin/room_manage', {
            title: 'Manage Room',
            layout: 'admin-main'
        });
    }

    // Trang quản lý đơn hàng
    order_manage(req, res, next) {
        res.render('admin/order_manage', {
            title: 'Manage Order',
            layout: 'admin-main'
        });
    }

    // Trang quản lý thông tin khách hàng
    async customer_manage(req, res, next) {
        await User.find({ role: 'client' }).exec()
            .then(customers => {
                res.render('admin/customer_manage', {
                    title: 'Manage Customer',
                    layout: 'admin-main',
                    customers: customers,
                });
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

        upload.single('file_upload')(req, res, async (err) => {
            if (err) {
                if (err.message === 'File too large') {
                    req.flash('error', 'File upload không được lớn hơn 5MB!');
                    res.redirect('/admin/customer/update/' + username);
                } else if (err.message === 'File type not allowed') {
                    req.flash('error', 'File upload không đúng định dạng!');
                    res.redirect('/admin/customer/update/' + username);
                }
            }
    
            if (req.file !== undefined) {
                let image = 'avatar-' + username + '.' + req.file.filename.split('.').pop();
                req.body.avatar = image;
            }
            
            req.body.updated_at = new Date();
    
            await User.findOneAndUpdate(filter, req.body, { new: true }).exec()
                .then(customer => {
                    req.flash('success', 'Cập nhật thông tin khách hàng thành công!');
                    res.redirect('/admin/customer');
                })
                .catch(err => {
                    req.flash('error', 'Cập nhật thông tin khách hàng thất bại!');
                    res.redirect('/admin/customer');
                });
        })
    }

    async delete_customer(req, res, next) {
        const id = req.params.id;
        const filter = { _id: id };

        await User.findOneAndDelete(filter).exec()
            .then(() => {
                req.flash('success', 'Xóa thông tin khách hàng thành công!');
                res.sendStatus(200);
            })
            .catch(err => {
                req.flash('error', 'Xóa thông tin khách hàng thất bại!');
                res.sendStatus(500);
            })
    }
}

module.exports = new AdminController();