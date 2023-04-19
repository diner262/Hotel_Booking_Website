const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/admin/login');
}

const forwardAuth = (req, res, next) => {
    if (!req.isAuthenticated() || req.user.role !== 'admin') {
        return next();
    }
    res.redirect('/admin/dashboard');
}

module.exports = {
    ensureAuth,
    forwardAuth
};