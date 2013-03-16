(function($){

var Contact = Backbone.Model.extend({
    defaults: {
      id : 0,
      nom : "a",
      prenom : "b",
      numero : 0
    },
    
    initialize : function Contact() {
    }
});

var Contacts = Backbone.Collection.extend({
	model : Contact
});

var ContactsView = Backbone.View.extend({
 	el : $ ('body'),
 	
 	events: {
      'click button#add': 'addContact',
      'click button#deleteB' : 'deleteContact'
    },
    
	 	initialize : function(){
	 	this.counter =1; 
 		_.bindAll(this, 'render', 'appendContact', 'addContact', 'deleteContact', 'template', 'removeContact');
 		this.collection = new Contacts();
        this.collection.bind('add', this.appendContact); // collection event binder
        this.collection.bind('remove', this.removeContact);
 		this.render();
 	},
 	
 	render : function(){
 		var self = this;
        $(this.el).append("<ul id='liste'></ul>");
 		_(this.collection.models).each(function(item){ // in case collection is not empty
        	self.appendContact(item);
      	}, this);
      	this.template();
      	
    },
    
    template : function(){
    	console.log(mus);
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
    },
    
    deleteContact : function(){
    	contact = this.collection.get(''+$('#delete').val());
    	this.collection.remove(contact)
    },
    
 	appendContact : function(contact){
 		$('#liste').append('<li id='+contact.get('id')+'><span>'+contact.get('id')+' '+contact.get('nom')+' '+contact.get('prenom')+'</span></li>');
 		this.template();
 	},
 	
 	removeContact : function(contact){
 		$('#'+contact.get('id')).remove();
		contact.destroy();
		this.template();
 	}
 	
 });
 	var mus = $('#tpl').html();
	var contactsView = new ContactsView();
})(jQuery);