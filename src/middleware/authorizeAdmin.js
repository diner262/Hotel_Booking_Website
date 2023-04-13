var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.model');


const authorizeAdmin = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById({_id: id}).then((user) => {
            done(null, user);
        });
    });

    passport.use(new LocalStrategy({usernameField:'username'}, async (username, password, done) => {
        const user = await User.findOne({ username });
        if (!user) return done(null, false, { message: 'Incorrect username.' });

        const isMatch = user.password === password;
        if (!isMatch) return done(null, null, { message: 'Incorrect password.' });

        return done(null, user);
    }));

}

module.exports = authorizeAdmin