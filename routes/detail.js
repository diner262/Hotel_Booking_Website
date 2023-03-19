var express = require('express');
var router = express.Router();

router.get('/detail', function(req, res, next) {
    res.render('detail', { title: 'Detail' });
});

router.get('/detail/:id', function(req, res, next) {
    res.render('detail', { title: 'Detail', id: req.params.id });
});
