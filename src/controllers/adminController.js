

class AdminController {

    login(req, res, next) {
        res.render('admin/login', { layout: false });
    }

    index(req, res, next) {
        res.render('admin/index', {
            title: 'Dashboard',
            layout: 'admin-main'
        });
    }
    profile(req, res, next) {
        res.render('client/profile', {
            title: 'Profile Admin',
            layout: 'admin-main'
        });
    }
}

module.exports = new AdminController;