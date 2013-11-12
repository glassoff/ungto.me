
var Person = require('../models/person').Person;
var Event = require('../models/event').Event;
var mailer = require('../classes/mailer.js');

/**
 * Create event with owner
 * @param req
 * @param res
 * @param next
 */
exports.create = function(req, res, next){
  var event = new Event({
    name: req.body.title
  });

  var owner = new Person({
    name: req.body.owner_name,
    email: req.body.owner_email
  });

  event.set('owner', owner);

  if(req.body.owner_is_member){
    owner.set('event', event);
  }

  console.log('Creating event...');
  owner.save(function(err){
    if(err){
      return next(err);
    }
    console.log('event owner created');
    event.save(function(err){
      if(err){
        return next(err);
      }
      console.log('done!');
      res.redirect('/event/' + event.uid);
    });
  });
};

/**
 * Show event
 * @param req
 * @param res
 */
exports.show = function(req, res, next){
  var eventUID = req.params.id;
  Event.findOne({uid: eventUID}).populate('owner').exec(function(err, event){
    if(err){
      return next(err);
    }
    Person.find({event: event}, function(err, persons){
      if(err){
        return next(err);
      }
      if(req.xhr){
        res.json(event);
      }
      else{
        res.render('event/show', { event: event, persons: persons });
      }
    });
  });
};

exports.update = function(req, res){
  var eventUID = req.params.id;
  var name = req.body.name
    , moneyLimit = req.body.moneyLimit;
  Event.findByUID(eventUID, function(err, event){
    event.name = name;
    event.moneyLimit = moneyLimit;
    event.save(function(err, event){
      res.redirect('/event/' + event.uid);
    });
  });
};

exports.delete = function(req, res){

};

/**
 * Добавление участника
 * @param req
 * @param res
 */
exports.addPerson = function(req, res){
  var name = req.body.name
    , email = req.body.email
    , phone = req.body.phone
    , eventUID = req.params.id

  Event.findByUID(eventUID, function(err, event){
    if(err){
      throw(err);
    }
    console.log(event)
    var person = new Person({
      event: event,
      name: name,
      email: email,
      phone: phone
    });

    person.save(function(err, person){
      if(err){
        throw(err);
      }
      res.json(person);
      mailer.notifyMemberAboutHeWasAdded(person, event);
    });
  });
};

/**
 * Список участников
 * @param req
 * @param res
 */
exports.getPersons = function(req, res){
  var eventUID = req.params.id

  var event = Event.findByUID(eventUID, function(err, event){
    Person.find({event: event}, function(err, persons){
      res.json(persons);
    });
  });
};