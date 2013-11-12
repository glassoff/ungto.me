// Event view

//jQuery(function(){
  (function($, _, Backbone){
    "use strict";

    var EventView = Backbone.View.extend({
      //el: $('#event-el'),
      initialize: function(){console.log('INIT')
        this.model.fetch({
          success: function(model, response){
            model.persons.fetch();
          },
          error: function(){
            console.log('error get event')
          }
        });
        this.model.persons.bind('add', this.addOnePerson);
        this.render();
      },
      events: {
        //"change input[type=text]": 'saveEvent',
        "submit #new-person-form": "addPerson"
      },
      render: function(){

      },
      saveEvent: function(){
        this.model.save();
      },
      addPerson: function(event){console.log('ADD')
        event.preventDefault();
        var personForm = $(event.target);
        this.model.persons.create(this.formSerialize(personForm));
        personForm.find('input').val('');
      },
      formSerialize: function(form){
        return _.reduce($(form).serializeArray(), function(memo, value){
          memo[value.name] = value.value;
          return memo;
        }, {});
      },
      addOnePerson: function(person){
        console.log('add person', person)
        var view = new app.views.personItem({model: person});
        $('#persons-list').append(view.render().el);
      }
    });

    app.views.eventShow = EventView;

  })(jQuery, _, Backbone);
//});



