//Event model
//jQuery(function(){
  (function($, _, Backbone){
    "use strict";

    var Event = Backbone.Model.extend({
      idAttribute: "uid",
      urlRoot: "/event",
      initialize: function(){
        this.persons = new app.collections.person();
        this.persons.eventId = this.id;
      }
    });

    app.models.event = Event;

  })(jQuery, _, Backbone);
//});


