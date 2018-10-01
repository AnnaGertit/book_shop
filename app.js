var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.locals.moment = require('moment');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', require('./routes/book/list'));
app.use('/books/add', require('./routes/book/add'));
app.use('/books/writer', require('./routes/book/writer'));
app.use('/books/store', require('./routes/book/store'));
app.use('/books/delete', require('./routes/book/delete'));
app.use('/books/search', require('./routes/book/search'));

app.use('/sales', require('./routes/sale/list'));
app.use('/sales/add', require('./routes/sale/add'));
app.use('/sales/cost', require('./routes/sale/cost'));

app.use('/publishes', require('./routes/publishes/list'));
app.use('/publishes/add', require('./routes/publishes/add'));
app.use('/publishes/diagram', require('./routes/publishes/diagram'));
app.use('/publishes/low_price', require('./routes/publishes/low_price'));
app.use('/publishes/delete', require('./routes/publishes/delete'));

app.use('/', require('./routes/index'));

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
  res.render('error');
});

module.exports = app;
