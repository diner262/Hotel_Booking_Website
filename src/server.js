var createError = require('http-errors');
var express = require('express');

var hbs = require('express-handlebars')

var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.routes');
var usersRouter = require('./routes/users.routes');
var detailRouter = require('./routes/detail.routes');
var adminRouter = require('./routes/admin.routes');

var port = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/resources/views'));

app.engine('hbs', hbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static('public'));

app.use('/users', usersRouter);
app.use('/detail', detailRouter);
app.use('/admin', adminRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('500');
});




app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  'Press Ctrl-C to terminate.'
))

module.exports = app;
