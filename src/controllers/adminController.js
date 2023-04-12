

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
}

module.exports = new AdminController;