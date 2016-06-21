var express = require('express');
var DataService = require('../services/dataService.js');
var app      = express();

app.get('/', function(req, res){
	var text = "Hi this is sample view of node exercise";
	res.render('character',{
		text: text
	});
});

app.get('/:name', function(req, res){
	var name = req.param('name');
	res.render('character',{
		name: name
	});
});

module.exports = app;