var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');


module.exports = (passport) => {
    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
        }, async (username, password, done) => {
            if (!username) return done(null, false, { message: 'Bạn chưa nhập tên đăng nhập.' });
            if (!password) return done(null, false, { message: 'Bạn chưa nhập mật khẩu.' });
            
            const user = await User.findOne({ username });
            if (!user) return done(null, false, { message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });

            const isMatch = user.password === password;
            if (!isMatch) return done(null, false, { message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' });

            return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById({_id: id}).then((user) => {
            done(null, user);
        });
    });
}