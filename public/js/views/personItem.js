// Person view
//jQuery(function(){
  (function($, _, Backbone){
    "use strict";


    var PersonView = Backbone.View.extend({
      tagName: 'tr',
      initialize: function(){

      },
      events: {

      },
      render: function(){
        console.log('person render')
        $(this.el).html('<td>'+this.model.get('name')+'</td><td>'+this.model.get('email')+'</td>');
        return this;
      }
    });

    app.views.personItem = PersonView;

  })(jQuery, _, Backbone);
//});

