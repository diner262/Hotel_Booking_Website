const ensureAuth = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'ADMIN_ROLE') {
        return next();
    }
    res.redirect('/admin/login');
}

const forwardAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/admin/');
}

module.exports = {
    ensureAuth,
    forwardAuth
};