var express = require('express');
var router = express.Router();

router.get('/profile', function(req, res, next) {
    res.render('client/profile', { layout: false ,title:"Profile"});
  });

router.get('/detail/:id', function(req, res, next) {
    res.render('detail', { title: 'Detail', id: req.params.id });
});

module.exports = router;