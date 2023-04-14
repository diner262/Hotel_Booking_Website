const { check } = require('express-validator');

let validateSignUp = () => {
    return [
        check('username', 'Email không được để trống').not().isEmpty(),
        check('username', 'Email không hợp lệ').isEmail(),
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

module.exports = {
    validateSignUp,
    validateLogin
}