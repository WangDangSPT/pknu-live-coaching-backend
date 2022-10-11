const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

require('dotenv').config()

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth')
const { urlencoded } = require('express');

const app = express();

app.use(logger('dev'));
// cross origin enabled
app.use(cors());
// parse incoming json data middleware
app.use(express.json());
// parse incoming data encoded in applicaiton/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/auth',authRouter);
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
