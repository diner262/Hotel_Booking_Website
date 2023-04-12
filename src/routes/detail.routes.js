var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('profile', { title: 'Detail', layout: false });
});

router.get('/detail/:id', function(req, res, next) {
    res.render('profile', { title: 'Detail', id: req.params.id });
});

module.exports = router;