var express = require('express'),
	app = express(),
	cons = require('consolidate'),
	bodyParser = require('body-parser');

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


// Handler for interanl server errors
function errorHandler(err, req, res, next) {
	console.log(err.message);
	console.log(err.stack);
	res.status(500);
	res.render('error_template', { error: err });
}

app.use(errorHandler);

// app.get('/:name', function(req, res, next) {
// 	var name = req.params.name;
// 	var getvar1 = req.query.getvar1;
// 	var getvar2 = req.query.getvar2;
// 	res.render('hello', { name : name, getvar1: getvar1, getvar2: getvar2 });
// });

	app.get('/', function (req, res, next) {
		res.render('fruitPicker', { 'fruits': ['apple', 'orange', 'banana', 'peach' ]});
	});

app.post('/', function (req, res, next ) {
	var favorite = req.body.fruit;
	if (typeof favorite == 'undefined') {
		next(Error('pPlease choose a fruit!'));
	} else {
		res.send("your favorite fruit is " + favorite);
	}
});



app.listen(3000);
console.log("Express server listening on port 3000");