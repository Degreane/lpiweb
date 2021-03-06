var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const session = require('express-session');
const uuid = require('uuid');
var logger = require('morgan');

const {db,collection} = require('./models')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const utils=require('util')
var expressHbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));

app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(uuid.v4()));
app.use(session({secret:uuid.v4(),resave: true,  saveUninitialized: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) {
	if ( !collection.users ){
		return next(new Error('No Users Collection.'))
	}
	req.collection=collection
	return next()
})

app.use('/', indexRouter);
app.use('/user', usersRouter);


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
