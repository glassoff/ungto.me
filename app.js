
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , routes = require('./routes')
  , event = require('./routes/event')
  , mongoose = require('mongoose')


var app = express();

require('./config/app_config')(app);

mongoose.connect('mongodb://localhost/secret-santa');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo DB connection error:'));


app.get('/', routes.index);

app.post('/', event.create);
app.get('/event/:id', event.show);
app.put('/event/:id', event.update);
app.delete('/event/:id', event.delete);

app.post('/event/:id/add-person', event.addPerson);

app.get('/event/:id/persons', event.getPersons);
app.post('/event/:id/persons', event.addPerson);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
