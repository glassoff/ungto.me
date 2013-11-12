
var mongoose = require('mongoose')
  , Schema = mongoose.Schema

//event schema
var eventSchema = mongoose.Schema({
  uid: String,//уникальный идентификатор события (для урлов)
  'owner': { type: Schema.ObjectId, ref: 'Person', required: true },//organizer
  name: {type: String, required: true},//title
  moneyLimit: Number,//max money for gift
  dueDate: Date, //date of generating
  date: Date, //date of event
  comment: String //text comment for members
});

var Event = mongoose.model('Event', eventSchema);

//statics methods
Event.findByUID = function(uid, cb){
  return this.findOne({uid: uid}, cb);
};

exports.Event = Event;


//set UID
eventSchema.pre('save', function(next){
  generateEventUID(this, next);
});

//notify owner
var mailer = require('../classes/mailer.js');
eventSchema.post('save', function(event){
  Event.findOne(event).populate('owner').exec(function(err, event){
    if(!err){
      mailer.notifyOwnerAboutNewEvent(event);
    }
    else{
      throw(err);
    }
  });
});

//generate and set UID
function generateEventUID(event, next){
  var uid = makeid();
  Event.findOne({uid: uid}, function(err, existEvent){
    if(!existEvent){
      event.set('uid', uid);
      next();
    }
    else{
      generateEventUID(next);
    }
  });
}

function makeid(){
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

  for( var i=0; i < 5; i++ )
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}