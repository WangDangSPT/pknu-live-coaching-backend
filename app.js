const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('tiny'));
//not using any POST handlers atm so we are not using the middleware below
// parse incoming json data middleware
//app.use(express.json());

//app.use(express.urlencoded({ extended: false }));

app.use('/users', usersRouter);

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
  res.send('custom error page here');
});

module.exports = app;
