const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'client') {
        return next();
    }
    res.redirect('/login');
}

const forwardAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/home');
}

module.exports = {
    ensureAuth,
    forwardAuth
};