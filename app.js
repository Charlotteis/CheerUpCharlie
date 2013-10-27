
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

// include the config file
var config = require('./config');

var twilio = require('twilio'); // see  template
var client = twilio(config.twilio.accountSID, config.twilio.authToken);

var app = express();

// setup sessions for use with express
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

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
app.get('/message', function(request, response) {
  var now = (new Date()).getTime();
  
  if (request.session.lastSent && request.session.lastSent + config.app.spamLimit > now) {
    response.send('Only one sms per '+config.app.spamLimit+"ms allowed");
    return;
  }
  request.session.lastSent = now;

  // Use the REST client to send a text message
  client.sendSms({
      to: config.app.to,
			from: config.twilio.from,
			body: request.param('body')
  }, function(err, data) {
      // When we get a response from Twilio, respond to the HTTP POST request
      response.send('Message is inbound!');
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
