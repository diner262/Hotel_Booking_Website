var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');
var Room = require('../models/room.model');


//Configuration for Multer
const multerStorageAvatar = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/avatar');
    },
    filename: (req, file, cb) => {
        cb(null, 'avatar-' + req.params.username + '.' + file.originalname.split('.').pop());
    },
});

const multerStorageRoom = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/room');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});


// Multer Filter
const multerFilter = (req, file, cb) => {
    let extension = file.originalname.split('.').pop();
    // Get only file image
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'png') {
        cb(null, true);
    } else {
        cb(new Error('File type not allowed'), false);
    }
};

// Upload file
const uploadAvatar = multer({
    storage: multerStorageAvatar,
    limits: { fileSize: 5 * 1024 * 1024 }, // save maximum size 5MB
    fileFilter: multerFilter
});

const uploadRoom = multer({
    storage: multerStorageRoom,
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

        uploadAvatar.single('file_upload')(req, res, async (err) => {
            if (err) {
                if (err.message === 'File too large') {
                    req.flash('error', 'File upload không được lớn hơn 5MB!');
                    res.redirect('/admin/customers/update/' + username);
                } else if (err.message === 'File type not allowed') {
                    req.flash('error', 'File upload không đúng định dạng!');
                    res.redirect('/admin/customers/update/' + username);
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
                    res.redirect('/admin/customers');
                })
                .catch(err => {
                    req.flash('error', 'Cập nhật thông tin khách hàng thất bại!');
                    res.redirect('/admin/customers');
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


    // Trang quản lý phòng
    async room_manage(req, res, next) {
        await Room.find().exec()
            .then(rooms => {
                res.render('admin/room_manage', {
                    title: 'Manage Room',
                    layout: 'admin-main',
                    rooms: rooms,
                });
            })
    }

    room_create(req, res, next) {
        res.render('admin/rooms/room_create', {
            title: 'Create Room',
            layout: 'admin-main'
        });
    }

    create_room(req, res, next) {
        uploadRoom.single('file_upload')(req, res, async (err) => {
            if (err) {
                if (err.message === 'File too large') {
                    req.flash('error', 'File upload không được lớn hơn 5MB!');
                    res.redirect('/admin/rooms/create');
                } else if (err.message === 'File type not allowed') {
                    req.flash('error', 'File upload không đúng định dạng!');
                    res.redirect('/admin/rooms/create');
                }
            }

            const roomFloor = req.body.floor;
            const roomCodeExists = new Array();
            const rooms = await Room.find().exec();

            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].floor == roomFloor) {
                    roomCodeExists.push(rooms[i].room_code);
                }
            }
            
            const len = roomCodeExists.length;
            if (roomCodeExists.length > 0) {
                req.body.room_code = Number(roomCodeExists[len - 1]) + 1;
            } else {
                req.body.room_code = roomFloor + 0 + 1;
            }
            
            if (req.file !== undefined) {
                let image = 'room-' + req.body.room_code + '.' + req.file.filename.split('.').pop();
                req.body.thumbnail = image;
                req.body.created_at = new Date();

                const oldPath = path.resolve(__dirname, '../../public/uploads/room/') + '/' + req.file.filename;
                const newPath = path.resolve(__dirname, '../../public/uploads/room/') + '/' + image;
                fs.rename(oldPath, newPath, async(err) => {
                    if (err) throw err
                    
                    const newRoom = new Room(req.body);
                    await newRoom.save().then(() => {
                        req.flash('success', 'Tạo phòng thành công!');
                        res.redirect('/admin/rooms');
                    })
                });
            } else {
                req.body.created_at = new Date();
                const newRoom = new Room(req.body);
                await newRoom.save().then(() => {
                    req.flash('success', 'Tạo phòng thành công!');
                    res.redirect('/admin/rooms');
                })
            }
        });
    }

    room_edit(req, res, next) {
        const room_code = req.params.room_code;
        const filter = { room_code: room_code };

        Room.findOne(filter).exec()
            .then(room => {
                res.render('admin/rooms/room_edit', {
                    title: 'Edit Room',
                    layout: 'admin-main',
                    room: room
                });
            })
    }

    update_room(req, res, next) {
        const room_code = req.params.room_code;
        const filter = { room_code: room_code };

        uploadRoom.single('file_upload')(req, res, async (err) => {
            if (err) {
                if (err.message === 'File too large') {
                    req.flash('error', 'File upload không được lớn hơn 5MB!');
                    res.redirect('/admin/rooms/update/' + room_code);
                } else if (err.message === 'File type not allowed') {
                    req.flash('error', 'File upload không đúng định dạng!');
                    res.redirect('/admin/rooms/update/' + room_code);
                }
            }

            const roomFloor = req.body.floor;
            if (roomFloor != String(room_code)[0]) {
                const roomCodeExists = new Array();
                const rooms = await Room.find().exec();

                for (let i = 0; i < rooms.length; i++) {
                    if (rooms[i].floor == roomFloor) {
                        roomCodeExists.push(rooms[i].room_code);
                    }
                }
                
                const len = roomCodeExists.length;
                if (roomCodeExists.length > 0) {
                    req.body.room_code = Number(roomCodeExists[len - 1]) + 1;
                } else {
                    req.body.room_code = roomFloor + 0 + 1;
                } 
            } else {
                req.body.room_code = room_code;
            }

            if (req.file !== undefined) {
                let oldImage = 'room-' + room_code + '.' + req.file.filename.split('.').pop();
                fs.unlinkSync(path.resolve(__dirname, '../../public/uploads/room/') + '/' + oldImage);
                
                let image = 'room-' + req.body.room_code + '.' + req.file.filename.split('.').pop();
                req.body.thumbnail = image;
                req.body.updated_at = new Date();

                const oldPath = path.resolve(__dirname, '../../public/uploads/room/') + '/' + req.file.filename;
                const newPath = path.resolve(__dirname, '../../public/uploads/room/') + '/' + image;
                fs.rename(oldPath, newPath, async(err) => {
                    if (err) throw err
                    
                    await Room.findOneAndUpdate(filter, req.body, { new: true }).exec()
                        .then(() => {
                            req.flash('success', 'Cập nhật thông tin phòng thành công!');
                            res.redirect('/admin/rooms');
                        })
                });
            } else {
                req.body.created_at = new Date();
                await Room.findOneAndUpdate(filter, req.body, { new: true }).exec()
                    .then(() => {
                        req.flash('success', 'Cập nhật thông tin phòng thành công!');
                        res.redirect('/admin/rooms');
                    })
            }
        })
    }
}

function getRoomCode(roomFloor) {
    const roomCodeExists = new Array();
    const rooms = Room.find().exec();

    for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].floor == roomFloor) {
            roomCodeExists.push(rooms[i].room_code);
        }
    }
    
    const len = roomCodeExists.length;
    if (roomCodeExists.length > 0) {
        return Number(roomCodeExists[len - 1]) + 1;
    } else {
        return roomFloor + 0 + 1;
    }
}

module.exports = new AdminController();