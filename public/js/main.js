//jQuery(function(){
  (function($, _, Backbone){
    "use strict";

    // Router
    var appRouter = Backbone.Router.extend({
      routes: {
        "event/:id": "showEvent"
      },
      //show page
      showEvent: function(eventId){
        console.log('show', eventId);

        var event = new app.models.event({uid: eventId});console.log($('#new-person-form'))
        var eventView = new app.views.eventShow({model: event, el: $('#event-el')});
      }
    });

    app.router = appRouter;

  })(jQuery, _, Backbone);
//});


jQuery(function(){
  (function($, _, Backbone){
    "use strict";

    console.log('START')
    //app start
    var router = new app.router;
    Backbone.history.start({ pushState: true });

  })(jQuery, _, Backbone);
});
