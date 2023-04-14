var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');


const authorizeAdmin = (passport) => {
    passport.use(new LocalStrategy({usernameField:'username'}, async (username, password, done) => {
        if (!username) return done(null, false, { message: 'Username is required.' });
        if (!password) return done(null, false, { message: 'Password is required.' });
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'The user entered is not with our records' });

        const isMatch = user.password === password;
        if (!isMatch) return done(null, null, { message: 'Incorrect password.' });

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

module.exports = authorizeAdmin