var express = require('express');
var DataService = require('../services/dataService.js');
var app      = express();
var _ = require('underscore');

app.get('/', function(req, res){
	var http = { req: req, res: res };
	var text = "Hi this is sample view of node exercise";
	var options = { url: 'api/people', method:'GET', http:http };
	var query = req.query;
	DataService.invoke(options, function(err, response){
		if(!err){
			var people = response.results;
			if(query.sort){
				var limit = 50;
				people = _.sortBy(people, 'height');
				if(people.length > 50){
					people = people.slice(0, 50);
				}
			}
			res.render('character',{
				people: people
			});
		}
	});
});

app.get('/:name', function(req, res){
	var name = req.param('name');
	res.render('character',{
		name: name
	});
});

module.exports = app;