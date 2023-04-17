var express = require('express');
var homeRouter = require('./home.routes');
var usersRouter = require('./users.routes');
var profileRouter = require('./profile.routes');
var adminRouter = require('./admin.routes');

function route(app) {
    // app.get('/profile', function(req, res, next) {
    //     res.render('client/profile', { layout: false ,title:"Profile"});
    //   });
    
    app.use('/users', usersRouter);
    app.use('/profile', profileRouter);
    app.use('/admin', adminRouter);
    app.use('/', homeRouter);
    
}

module.exports = route;