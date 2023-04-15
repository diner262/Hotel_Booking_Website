var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var hbs = require('express-handlebars');
var passport = require('passport');

var path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var flash = require('connect-flash');
// var rateLimit = require('express-rate-limit')
// var cors = require('cors')

var indexRouter = require('./routes/index.routes');


// connect mongoose db
var mongodb = require('./config/connection');
mongodb._connect();

var port = process.env.PORT || 3000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/resources/views'));

app.engine('hbs', hbs.engine({
  defaultLayout: 'main',
  extname: '.hbs',
  helpers: {
    json: function (context) { 
        return JSON.stringify(context);
    },
    ifeq: function (val1, val2) {
        return (val1 === val2);
    }
}
}))
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static('public'));

// session middleware
app.use(session({
  secret: 'mysecret',
  cookie: { maxAge: 3 * 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./middlewares/passport')(passport);

var flashMessage = require('./middlewares/flashMessage');
app.use(flashMessage);

indexRouter(app)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err.message);
  res.render('500');
});




app.listen(port, () => console.log(
  `Express started on http://localhost:${port}; ` +
  'Press Ctrl-C to terminate.'
))

module.exports = app;
