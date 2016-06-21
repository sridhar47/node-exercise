var express = require('express');
var DataService = require('../services/dataService.js');
var app      = express();

app.get('/', function(req, res){
	var http = { req: req, res: res };
	var options = { url: 'api/planets', method:'GET', http:http };
	var query = req.query;
	DataService.invoke(options, function(err, response){
		if(!err){
			var data = {};
			var planets = response.results;
			if(query.page){
				var limitOfResponse = 10;
				var limit = JSON.parse(query.page);
				var startIndex = (limit-1) * limitOfResponse;
				var endIndex = limit * limitOfResponse;
				if(startIndex < planets.length){
					planets = planets.slice(startIndex, endIndex);
				}
			}
			planets.forEach(function(obj){
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