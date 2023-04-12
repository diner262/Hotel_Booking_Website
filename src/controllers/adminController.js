

class AdminController {

    login(req, res, next) {
        res.render('admin/login', { layout: false });
    }

    home(req, res, next) {
        res.render('admin/dashboard', {
            title: 'Dashboard',
            layout: 'admin-main'
        });
    }

    room_manage(req, res, next) {
        res.render('admin/room_manage', {
            title: 'Manage Room',
            layout: 'admin-main'
        });
    }

    order_manage(req, res, next) {
        res.render('admin/order_manage', {
            title: 'Manage Order',
            layout: 'admin-main'
        });
    }

    customer_manage(req, res, next) {
        res.render('admin/customer_manage', {
            title: 'Manage Customer',
            layout: 'admin-main'
        });
    }
}

module.exports = new AdminController;