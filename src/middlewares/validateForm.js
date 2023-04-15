var { check } = require('express-validator');
var { validationResult, matchedData } = require('express-validator');

let validateSignUp = () => {
    return [
        check('username', 'Email không được để trống').not().isEmpty(),
        check('username', 'Email không hợp lệ'),
        check('email', 'Email không được để trống').not().isEmpty(),
        check('email', 'Email không hợp lệ').isEmail(),
        check('password', 'Mật khẩu không được để trống').not().isEmpty(),
        check('password', 'Mật khẩu phải chứa ít nhất 6 ký tự').isLength({ min: 6 }),
        check('confirm_password', 'Mật khẩu xác nhận không được để trống').not().isEmpty(),
        check('confirm_password').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Mật khẩu xác nhận không hớp');
            }
            return true;
        })
    ];
}

let validateLogin = () => {
    return [
        check('username', 'Tên đăng nhập không được để trống').not().isEmpty(),
        check('password', 'Mật khẩu không được để trống').not().isEmpty(),
    ];
}

let handleLoginAdmin = (req, res, next) => {
    const data = matchedData(req);
    let error = validationResult(req)
    if (!error.isEmpty()) {
        req.flash('error', error.array()[0].msg);

        return res.render('admin/login', {
            title: 'Login Dashboard',
            layout: false,
            username: data.username,
            password: data.password,
            messageFailure: req.flash('error'),
        });
    }
    return next();
}

let handleLoginClient = (req, res, next) => {
    const data = matchedData(req);
    let error = validationResult(req)
    if (!error.isEmpty()) {
        req.flash('error', error.array()[0].msg);

        return res.render('client/login', {
            title: 'Login',
            layout: false,
            username: data.username,
            password: data.password,
            messageFailure: req.flash('error'),
        });
    }
    return next();
}


module.exports = {
    validateSignUp,
    validateLogin,
    handleLoginAdmin,
    handleLoginClient
}