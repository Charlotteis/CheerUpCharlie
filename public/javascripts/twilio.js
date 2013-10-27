//Initialize a REST client in a single line:
var client = require('twilio')('AC22a2fa071c05f477a7a0247f84aa93ad', '271eb4ed8c43946ef27d61a1e98ac52e');
 
// Use this convenient shorthand to send an SMS:
client.sendSms({
to:'+447725989820',
from:'+441772367539',
body: request.param('body')
}, function(error, message) {
if (!error) {
console.log('Success! The SID for this SMS message is:');
console.log(message.sid);
 
console.log('Message sent on:');
console.log(message.dateCreated);
}
else {
console.log('Oops! There was an error.');
}
});


