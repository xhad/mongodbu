var express = require('express'),
	app = express(),
	engines = require('consolidate'),
	MongoClient = require('mongodb').MongoClient,
	assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

MongoClient.connect('mongodb://localhost:27017/videos', function(err, db) {

	assert.equal(null, err);
	console.log("Successfully connected to MongoDB.");

	app.get('/', function (req, res) {
		// res.send('Hello World');
		// res.render('hello', {'name': 'Templates'});
		db.collection('movies').find({}).toArray(function(err, docs) {
			res.render('movies', { 'movies': docs} );
		});
	});

	// fall through route event handler for any non used urls. 
	app.use(function(req, res) {
		res.sendStatus(404);
	});

	var server = app.listen(3000, function () {
		var port = server.address().port;
		console.log("Express is listening on port %s", port);
	});

});