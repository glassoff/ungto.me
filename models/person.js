
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

//person
var personSchema = mongoose.Schema({
  'event': { type: Schema.ObjectId, ref: 'Event' },
  'name': {type: String, required: true},
  'email': {type: String, required: true},
  'phone': String
});

exports.Person = mongoose.model('Person', personSchema);