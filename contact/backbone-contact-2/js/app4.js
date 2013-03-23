(function($){

var Contact = Backbone.Model.extend({
    defaults: {
      id : 0,
      nom : "a",
      prenom : "b",
      numero :"0"
    },
    //url : 'getAll'
});

var Contacts = Backbone.Collection.extend({
  model : Contact,

  comparator: function(contact) {
     return contact.get('id');
  },
  url : 'http://localhost:8080/jaxrs-contact/contacts/getAll'
});

var ContactsView = Backbone.View.extend({
  el : $ ('body'),
  
  events: {
      'click button#add': 'addContact',
      'click button#deleteB' : 'deleteContact',
      'click button#edit' : 'editContact'
    },
    
  initialize : function(){
      this.counter =1; 
      _.bindAll(this, 'render', 'addContact', 'deleteContact', 'template', 'editContact');
      this.collection = new Contacts();
      this.collection.fetch();
      console.log(this.collection);
      this.template();
      this.render();
  },
  
    render : function(){
  this.template();
    },
    
    template : function(){
  this.collection.sort();
  console.log(this.collection);
      var that = this;
      $.ajax({
          url : "trame.html",
          cache : false,
          success : function(html){
        $('#tpl').empty();
        $('#tpl').append(mus);
        var val= that.collection.toJSON();
          $('#tpl').html(Mustache.render($('#tpl').html(),{book : val}));
          },
          error : function(XMLHttpRequest, textStatus, errorThrown){
        alert();
          }
      });
    },

    addContact: function(){
      var contact = new Contact({
        id : this.counter,
        nom : ($('#nom')).val(),
        prenom : ($('#prenom')).val(),
      });
      this.counter++;
      this.collection.add(contact);
      var that = this;
        jQuery.ajax({
          url: 'http://localhost:8080/jaxrs-contact/contacts/addContact',
          type: 'post',
          crossDomain: true,
          data: JSON.stringify(that.contact),
          dataType: 'json',
          beforeSend: function(req) {
            req.setRequestHeader('Content-Type', 'application/json');
          },
          success: function(data) {
            console.log('cool');
            //that.trigger('addContactOK', data);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.log('dommage');
            //that.trigger('addContactNOTOK', that.contact);
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      
      this.template();
    },
    
    deleteContact : function(){
      contact = this.collection.get(''+$('#delete').val());
      this.collection.remove(contact);
      jQuery.ajax({
          url: 'http://localhost:8080/jaxrs-contact/contacts/editContact/'+$('#delete').val(),
          type: 'DELETE',
          dataType: 'json',
          beforeSend: function(req) {
            req.setRequestHeader('Content-Type', 'application/json');
          },
          success: function(data) {
            console/log('cool');
          },
          error: function(jqXHR, textStatus, errorThrown) {
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      this.template();
    },
    
    editContact : function(){
      contact = this.collection.get(''+$('#idE').val());
      this.collection.remove(contact);
      contact.set({nom : $('#nomE').val()});
      contact.set({prenom : $('#prenomE').val()});
      this.collection.add(contact);
      jQuery.ajax({
          url: 'http://localhost:8080/jaxrs-contact/contacts/editContact/'+$('#idE').val(),
          type: 'PUT',
          data: JSON.stringify(contact),
          dataType: 'json',
          beforeSend: function(req) {
            req.setRequestHeader('Content-Type', 'application/json');
          },
          success: function(data) {
            //that.trigger('updateContactOK', data);
            console.log('cool');
          },
          error: function(jqXHR, textStatus, errorThrown) {
            //that.trigger('updateContactNOTOK', contact);
            // TODO: trigger event error
            console.log(textStatus);
            console.log(errorThrown);
          }
        });
      this.template();
    }
 });
    var mus = $('#tpl').html();
    var contactsView = new ContactsView();
})(jQuery);