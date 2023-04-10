

class AdminController {

    login(req, res, next) {
        res.render('admin/login', { layout: false });
    }
}

module.exports = new AdminController;