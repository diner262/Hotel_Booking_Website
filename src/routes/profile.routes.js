var express = require('express');
const adminController = require('../controllers/adminController');

var router = express.Router();

router.get('/:id', function (req, res, next) {
  res.render('client/profile', { layout: "main", title: "Profile User" });
});

// router.get('/:id', function (req, res, next) {
//   res.render('detail', { title: 'Detail', id: req.params.id });
// });

module.exports = router;