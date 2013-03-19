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

var ContactView = Backbone.View.extend({
	//tagName: 'li',
	
	initialize : function(){
		_.bindAll(this, 'render');
	},
	
	render : function(){
		$(this.el).html('<li id='+this.model.get('id')+'><span>'+this.model.get('id')+' '+this.model.get('nom')+' '+this.model.get('prenom')+'</span></li>');
		//$(this.el).html('<span id='+this.model.get('id')+'>'+this.model.get('id')+' '+this.model.get('nom')+' '+this.model.get('prenom')+'</span>');
		return this;
	},
	
	delFunc : function(){
		$('#'+this.model.get('id')).remove();
		//$(this.el).remove();
		this.model.destroy();
		return this;
	},
});

var ContactsView = Backbone.View.extend({
 	el : $ ('body'),
 	
 	events: {
      'click button#add': 'addContact',
      'click button#delete' : 'deleteContact'
    },
    
	 	initialize : function(){
	 	this.counter =1; 
 		_.bindAll(this, 'render', 'appendContact', 'addContact', 'deleteContact');
 		this.collection = new Contacts();
        this.collection.bind('add', this.appendContact); // collection event binder
        this.collection.bind('remove', this.removeContact);
 		this.render();
 	},
 	
 	render : function(){
 		var self = this;
        $(this.el).append("<ul></ul>");
 		_(this.collection.models).each(function(item){ // in case collection is not empty
        	self.appendContact(item);
      	}, this);
      	//mustache
      	var tpl = $("#tpl").html;
      	var val= {book : this.collection.toJSON()};
      	tpl(Mustache.render($('#tpl').html(),val));
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
    	console.log($('#delete').val());
    	contact = this.collection.get(''+$('#delete').val());
    	console.log(contact)
    	var contactView = new ContactView({
 			model : contact
 		});
 		contactView.delFunc();
    	this.collection.remove(($('#id')).val())
    },
    
 	appendContact : function(contact){
 		var contactView = new ContactView({
 			model : contact
 		});
 		$('ul', this.el).append(contactView.render().el);
 	},
 	
 	removeContact : function(contact){
 		var contactView = new ContactView({
 			model : contact
 		});
 		contactView.delFunc();
 	}
 	
 });
 
	var contactsView = new ContactsView();
})(jQuery);