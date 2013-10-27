
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var twilio = require('twilio'); // see  template
var client = twilio('AC22a2fa071c05f477a7a0247f84aa93ad', '271eb4ed8c43946ef27d61a1e98ac52e');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

// handle a POST request to send a text message.  This is sent via ajax on our
// home page
app.post('/message', function(request, response) {
    // Use the REST client to send a text message
    client.sendSms({
        to:'+447725989820',
				from:'+441772367539',
				body: request.param('body')
    }, function(err, data) {
        // When we get a response from Twilio, respond to the HTTP POST request
        response.send('Message is inbound!');
    });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
