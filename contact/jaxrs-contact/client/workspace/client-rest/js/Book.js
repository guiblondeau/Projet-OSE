(function($) {
	
			var BookJS = {};
			window.BookJS = BookJS;
			
			var hashTemplate = {'contactList':window.contactListTemplate, 'contactEdit':window.contactEditTemplate, 'contactAdd':window.contactAddTemplate};
			
			 var template = function(name) {
			    return Mustache.compile(hashTemplate[name]);
			 };
			
			
	        BookJS.Contact = Backbone.Model.extend({
        

            defaults : {
                id :'',
				prenom:"j'ai pas de nom",
				nom:"j'ai pas de prenom",
                numero:"911",
				validate:true
            },

            initialize : function() {
                console.log('Contact Constructor');
				this.on("invalid", function(model, error){
				console.log( error );
			});
				
				
            },
			
			setPrenom : function(value){
				this.set({prenom:value});
			},
			
			setNom : function(value){
				this.set({nom:value});
			},
			
			validate : function(attributes){
				if(attributes.prenom ==='' ||attributes.nom === ''){
					return "Le nom et le prenom ne peuvent �tre vides";
				}
			}
			
			
			
		
			
        });

        

      BookJS.Book = Backbone.Collection.extend({
		model : BookJS.Contact,
		localStorage: new Store("book"),
		
		
		initialize : function(){
			//this.url = "../getAll";
			console.log('Book constructor');
		}
		
		
	  
	  });
	  
	  BookJS.BookView = Backbone.View.extend({
        template : template('contactList'),
        
        
        
        initialize : function() {
			console.log("BookView constructor");
			
			
			
			this.collection = new BookJS.Book();
            this.collection.on('all', this.render, this);
            this.collection.fetch();
            
        },

		
			
        render : function() {

        
			var val2 = {contactList : this.collection.toJSON()};
			
			
			
            var renderedContent = this.template(val2); 
			
			if(this.collection.length ==1){
				console.log(JSON.stringify(val2));
			}
			
			$(this.el).html(renderedContent);
			addForm = new BookJS.AddForm({collection:this.collection});
			$(this.el).append(addForm.render().el);
            return this;
        },
		
		
    });
    
    
    BookJS.AddForm = Backbone.View.extend({
    template: template('contactAdd'),
    events: {
      'click button#validAddContact': 'add'
    },
    render: function() {
      $(this.el).html(this.template);
      return this;
    },
    add: function(event) {
     event.preventDefault();
     
     this.collection.create({nom: $('#nom').val(), prenom:$('#prenom').val(), numero:$('#numero').val()})?console.log('success'):console.log('failure');
   	window.kollec = this.collection;
   	this.render();
    
    },
    bidon:function(){
    	console.log('ici ça passe');
    }
    
  });
  
   
   
   
    
	    BookRouter = Backbone.Router.extend({
	    initialize: function(options) {
	      this.el = options.el
	    },
	    routes: {
	      "": "index"
	    },
	    index: function() {
	      var index = new BookJS.BookView();
	      this.el.empty();
	      this.el.append(index.render().el);
	    }
	  });
    
    BookJS.boot = function(container){
		container = $(container);
		var router = new BookRouter({el:container});    
		Backbone.history.start();	
    
    }
    
  

    })(Zepto);