var tropoapi = require('tropo-webapi');
var express = require('express');
var app = express.createServer(); 


app.configure(function(){
	app.use(express.bodyParser());
});

app.get('/', function(req, res) {
	res.send('app must be called from tropo');
});

app.post('/', function(req, res){
	var tropo = new tropoapi.TropoWebAPI();
	tropo.say("Hello Mariam!.");

	var say = {"value":"Do you love Mathieu Gosbee? Say yes or no!"};
	var choices = {"value":"yes(1, yes), no(2, no)"};

	tropo.ask(choices, 3, false, null, "foo", null, true, say, 5, null);
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