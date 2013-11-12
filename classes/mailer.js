'use strict'

var nodemailer = require('nodemailer');
var jade = require('jade');

var baseUrl = "http://localhost:3000";//XXX

var defaultTransport = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: 'dmitry.glassoff@gmail.com',
    pass: 'Happylife'
  }
});

function Mail(options)
{
  for (var key in options){
    this.options[key] = options[key];
  }
};

Mail.prototype =
{
  transport: defaultTransport,
  options: {
    from: "dmitry.glassoff@gmail.com",
    data: {}
  },
  path: __dirname + "/../views/mail/",
  send: function()
  {
    if(this.options.template){
      var _this = this;
      var data = this.options.data;
      data.baseUrl = baseUrl;
      jade.renderFile(this.path + this.options.template, data, function(err, file){
        if(!err){
          _this.options.html = file;
          _this._send();
        }
        else{
          throw(err);
        }
      });
    }
  },
  _send: function()
  {
    this.transport.sendMail(this.options, function(error, response){
      if(error){
        console.log(error);
      }else{
        console.log("Message sent: " + response.message);
      }
    });
  }
};

//public methods
exports.notifyOwnerAboutNewEvent = function(event)
{
  var mail = new Mail({
    subject: "Вы создали новое событие " + event.name,
    to: event.owner.email,
    template: "new_event_to_owner.jade",
    data: {
      event: event
    }
  });
  mail.send();
};

exports.notifyMemberAboutHeWasAdded = function(member, event)
{
  var mail = new Mail({
    subject: "Вас добавили в список участников события " + event.name,
    to: member.email,
    template: "was_added_to_member.jade",
    data: {
      person: member,
      event: event
    }
  });
  mail.send();
};