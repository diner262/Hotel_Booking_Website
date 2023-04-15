var express = require('express');
var homeRouter = require('./home.routes');
var usersRouter = require('./users.routes');
var detailRouter = require('./detail.routes');
var adminRouter = require('./admin.routes');

function route(app) {
    app.use('/users', usersRouter);
    app.use('/detail', detailRouter);
    app.use('/admin', adminRouter);
    app.use('/', homeRouter);
}

module.exports = route;