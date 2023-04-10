var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('client/home', { title: 'Home' });
});

router.get('/login', function(req, res, next) {
  res.render('client/login', { layout: false });
});
router.get('/signup', function(req, res, next) {
  res.render('client/signup', { layout: false });
});

module.exports = router;

