var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routes = require('./index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/', routes);
app.use(express.static(__dirname));

var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Listening on port ', port);
})