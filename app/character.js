var express = require('express');
var DataService = require('../services/dataService.js');
var app      = express();

app.get('/', function(req, res){
	var text = "Hi this is sample view of node exercise";
	res.render('character',{
		text: text
	});
});

module.exports = app;