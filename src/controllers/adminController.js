var passport = require('passport');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var User = require('../models/user.model');
var Room = require('../models/room.model');
var RoomType = require('../models/room_type.model');


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
        })(req, res, next);
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
            title: 'Trang điều khiển',
            layout: 'admin-main',
            user: req.user
        });
    }

    // Trang xem lịch
    calendar(req, res, next) {
        res.render('admin/calendar', {
            title: 'Xem lịch',
            layout: 'admin-main'
        });
    }

    // Trang quản lý đơn hàng
    order_manage(req, res, next) {
        res.render('admin/order_manage', {
            title: 'Quản lý đơn đặt phòng',
            layout: 'admin-main'
        });
    }

    // Trang quản lý thông tin khách hàng
    async customer_manage(req, res, next) {
        await User.find({ role: 'client' }).exec()
            .then(customers => {
                res.render('admin/customer_manage', {
                    title: 'Quản lý Khách hàng',
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
                    title: 'Thông tin chi tiết khách hàng',
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
                    title: 'Cập nhật thông tin khách hàng',
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

        await User.findByIdAndDelete(id).exec()
            .then((user) => {
                if (user.avatar !== undefined) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/uploads/avatar/') + '/' + user.avatar);
                }
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
        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        })
        
        await Room.find().exec()
            .then(rooms => {
                res.render('admin/room_manage', {
                    title: 'Quản lý Phòng',
                    layout: 'admin-main',
                    rooms: rooms,
                    room_types: types
                });
            })
    }

    async getCodeRoom(req, res, next) {
        const roomFloor = req.params.floor;
        const roomCodeExists = new Array();
        const roomCode = new Array();
        const rooms = await Room.find().exec();

        for (let i = 0; i < rooms.length; i++) {
            if (rooms[i].floor == roomFloor) {
                roomCodeExists.push(rooms[i].room_code);
            }
        }

        const room_numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < roomCodeExists.length; i++) {  
            if (room_numbers.includes(Number(roomCodeExists[i] % 10))) {
                room_numbers.splice(room_numbers.indexOf(Number(roomCodeExists[i] % 10)), 1);
            }
        }
        for (let j = 0; j < room_numbers.length; j++) {
            roomCode.push(roomFloor + 0 + room_numbers[j]);
        }

        res.send(roomCode);
    }

    async room_create(req, res, next) {
        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        })

        res.render('admin/rooms/room_create', {
            title: 'Thêm mới Phòng',
            layout: 'admin-main',
            room_types: types
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
                        req.flash('success', 'Thêm mới phòng thành công!');
                        res.redirect('/admin/rooms');
                    })
                });
            } else {
                req.body.created_at = new Date();
                const newRoom = new Room(req.body);
                await newRoom.save().then(() => {
                    req.flash('success', 'Thêm mới phòng thành công!');
                    res.redirect('/admin/rooms');
                })
            }
        });
    }

    async room_edit(req, res, next) {
        const room_code = req.params.room_code;
        const filter = { room_code: room_code };

        const room_types = await RoomType.find().exec();
        const types = room_types.map(room_type => {
            return {
                id: room_type._id,
                name: room_type.name
            }
        })
        
        await Room.findOne(filter).exec()
            .then(room => {
                res.render('admin/rooms/room_edit', {
                    title: 'Cập nhật Phòng',
                    layout: 'admin-main',
                    room: room,
                    room_types: types
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

            if (req.file !== undefined) {
                const oldImage = 'room-' + room_code + '.' + req.file.filename.split('.').pop();
                fs.unlinkSync(path.resolve(__dirname, '../../public/uploads/room/') + '/' + oldImage);
                
                const image = 'room-' + req.body.room_code + '.' + req.file.filename.split('.').pop();
                req.body.thumbnail = image;
                req.body.updated_at = new Date();
                const types = req.body.room_type;
                const typesPromises = types.map(async (type) => {
                    const room_type = await RoomType.findById(type.id);
                    if (!room_type) {
                        res.status(404).send({
                            code: 1,
                            message: `Không tìm thấy sản phẩm có id ${type.id}!`,
                        });
                    }
                    type.name = room_type.name;
                    return type;
                });
                req.body.room_type = await Promise.all(typesPromises);

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

    async delete_room(req, res, next) {
        const id = req.params.id;
        await Room.findByIdAndDelete(id).exec()
            .then((room) => {
                if (room.thumbnail !== undefined) {
                    fs.unlinkSync(path.resolve(__dirname, '../../public/uploads/room/') + '/' + room.thumbnail);
                }
                req.flash('success', 'Xóa thông tin phòng thành công!');
                res.sendStatus(200);
            })
            .catch(err => {
                req.flash('error', 'Xóa thông tin phòng thất bại!');
                res.sendStatus(500);
            })
            
    }

    // Quản lý thể loại phòng
    async room_type_manage(req, res, next) {
        await RoomType.find().exec()
            .then(roomTypes => {
                res.render('admin/room_type_manage', {
                    title: 'Quản lý loại phòng',
                    layout: 'admin-main',
                    roomTypes: roomTypes
                });
            })
    }

    async create_room_type(req, res, next) {
        const roomTypes = RoomType.find().exec();
        
        for (let i = 0; i < roomTypes.length; i++) {
            if (roomTypes[i].name == req.body.name) {
                req.flash('error', 'Tên loại phòng đã tồn tại!');
                res.redirect('/admin/room_types');
            }
        }

        const newRoomType = new RoomType(req.body);
        await newRoomType.save().then(() => {
            req.flash('success', 'Thêm loại phòng mới thành công!');
            res.redirect('/admin/room_types');
        });
    }

    async update_room_type(req, res, next) {
        const id = req.params.id;
        await RoomType.findByIdAndUpdate(id, req.body, { new: true }).exec()
            .then(() => {
                req.flash('success', 'Cập nhật loại phòng thành công!');
                res.redirect('/admin/room_types');
            })
    }
}

module.exports = new AdminController();