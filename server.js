/**
 * Showing with the Express framwork http://expressjs.com/
 * Express must be installed for this sample to work
 */

var tropoapi = require('tropo-webapi');
var express = require('express');
var app = express.createServer(); 

/**
 * Required to process the HTTP body
 * req.body has the Object while req.rawBody has the JSON string
 */
app.configure(function(){
	app.use(express.bodyParser());
});

app.get('/', function(req, res) {
	res.send('app must be called from tropo');
});

app.post('/', function(req, res){
	// Create a new instance of the TropoWebAPI object.
	var tropo = new tropoapi.TropoWebAPI();
	// Use the say method https://www.tropo.com/docs/webapi/say.htm
	tropo.say("Hello Mariam!.");

	// Demonstrates how to use the base Tropo action classes.
	var say = {"value":"Do you love Mathieu Gosbee? Say yes or no!"};
	// var choices = new tropo.Choices("[5 DIGITS]");
	var choices = {"value":"yes(1, yes), no(2, no)"};

	// Action classes can be passes as parameters to TropoWebAPI class methods.
	// use the ask method https://www.tropo.com/docs/webapi/ask.htm
	tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);
	// use the on method https://www.tropo.com/docs/webapi/on.htm
	tropo.on("continue", null, "/answer", true);

    res.send(tropoapi.TropoJSON(tropo));
});

app.post('/answer', function(req, res){
	// Create a new instance of the TropoWebAPI object.
	var tropo = new tropoapi.TropoWebAPI();
	try {
		if (req.body['result']['actions']['interpretation'] == 'yes') {
			tropo.say("Mathieu misses you! Sad face!!")
		}
		else {
			tropo.say("That was not very nice.");
		}
		
	}
	catch(err) {
		tropo.say("no data received");
	}
	res.send(tropoapi.TropoJSON(tropo));
});

app.listen(10104);
// console.log('Server running on http://0.0.0.0:8000/')