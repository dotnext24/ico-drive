var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');


var accountApi = require('./routes/account.route');
var userApi=require('./routes/user.route');
var bookApi=require('./routes/book.route');
var mailApi=require('./routes/mail.route');
var app = express();

var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(express.static(path.join(__dirname, 'dist')));

//app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/books', express.static(path.join(__dirname, 'dist')));
app.use('/api', accountApi);
app.use('/api', userApi);
app.use('/api', bookApi);
app.use('/api', mailApi);


app.use(passport.initialize());

app.use('*',function(req,res) {
  res.sendFile("dist/index.html", { root: '.' });
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    console.log("global error: ",err);
    // render the error page
    res.status(err.status || 500);
   
    if(err.status==404)
    res.sendFile('not-found.html', {root : __dirname + '/dist/views'});
    else   
    res.sendFile('error.html', {root : __dirname + '/dist/views'});
  
  });

  module.exports = app;