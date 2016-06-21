var express = require('express');
var DataService = require('../services/dataService.js');
var app      = express();

app.get('/', function(req, res){
	var http = { req: req, res: res };
	var options = { url: 'api/planets', method:'GET', http:http };
	DataService.invoke(options, function(err, response){
		if(!err){
			var data = {};
			response.results.forEach(function(obj){
				data[obj.name] = [];
				data[obj.name].push(obj.rotation_period);
				data[obj.name].push(obj.orbital_period);
				data[obj.name].push(obj.diameter);
				data[obj.name].push(obj.terrain);
			});
			res.json(data)
		}
	});
});


module.exports = app;