(function($){

var Contact = Backbone.Model.extend({
    defaults: {
      id : 0,
      nom : "a",
      prenom : "b",
      numero : 0
    },
    url : 'getAll'
});

var Contacts = Backbone.Collection.extend({
	model : Contact,
	url : 'getAll'
});

var ContactsView = Backbone.View.extend({
 	el : $ ('body'),
 	
 	events: {
      'click button#add': 'addContact',
      'click button#deleteB' : 'deleteContact'
    },
    
	 	initialize : function(){
	 	this.counter =1; 
 		_.bindAll(this, 'render', 'addContact', 'deleteContact', 'template');
 		this.collection = new Contacts();
 		this.collection.fetch();
 		console.log(this.collection);
 		this.render();
 	},
 	
 	render : function(){
 		//var self = this;
 		//_(this.collection.models).each(function(item){ // in case collection is not empty
        //	self.appendContact(item);
      	//}, this);
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
    			console.log(val);
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
      contact.save();
      this.template();
    },
    
    deleteContact : function(){
    	contact = this.collection.get(''+$('#delete').val());
    	this.collection.remove(contact);
    	this.template();
    },
    
 });
 	var mus = $('#tpl').html();
	var contactsView = new ContactsView();
})(jQuery);