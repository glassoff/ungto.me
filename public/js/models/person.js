//Person model
//jQuery(function(){
  (function($, _, Backbone){
    "use strict";

    var Person = Backbone.Model.extend({

    });

    //Person collection
    var PersonList = Backbone.Collection.extend({
      model: Person,
      url: function(){
        return "/event/"+this.eventId+"/persons";
      }

    });

    app.models.person = Person;
    app.collections.person = PersonList;

  })(jQuery, _, Backbone);
//});



