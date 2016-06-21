var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port     = process.env.PORT || 3007;


var busboy = require('connect-busboy');

var character = require('./app/character.js');
var planets = require('./app/planets.js');
// var buses =  require('./character/buses');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(busboy());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/character', character);
app.use('/planetresidents', planets);
// app.use('/busstops', busstops);
// app.use('/buses',buses);




/// catch 404 and forward to error handler
// app.use(function(req, res, next) {
// 	var err = new Error('Not Found');
// 	err.status = 404;
// 	next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
// 	app.use(function(err, req, res, next) {
// 		res.status(err.status || 500);
// 		res.render('error', {
// 			message: err.message,
// 			error: err
// 		});
// 	});
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
// 	res.status(err.status || 500);
// 	res.render('error', {
// 		message: err.message,
// 		error: {}
// 	});
// });

app.listen(port);
console.log('The magic happens on port ' + port );

module.exports = app;
