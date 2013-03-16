(function($) {
	
			var BookJS = {};
			window.BookJS = BookJS;
			
			var hashTemplate = {'contactList':window.contactList, 'contactEdit':window.contactEditTemplate, 'contactAdd':window.contactAddTemplate};
			
			 var template = function(name) {
			    return Mustache.compile(hashTemplate[name]);
			 };
			
			
	        bookJS.Contact = Backbone.Model.extend({
        

            defaults : {
                id : "???",
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
		model : Contact,
		
		initialize : function(){
			//this.url = "../getAll";
			console.log('Book constructor');
		}
		
		
	  
	  });
	  
	  BookJS.BookView = Backbone.View.extend({
        el : $('#contact-container'),
        template : template('contactList'),
        
        
        
        initialize : function() {
			console.log("BookView constructor");
			
			
			
			_.bindAll(this, 'render');
			this.collection = new Book();
            this.collection.bind('change', this.render);
			this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
        },

		
			
        render : function() {
			var val2 = {contactList : this.collection.toJSON()};
			
            var renderedContent = Mustache.render(this.template, val2);
			
			$(this.el).html(renderedContent);
            return this;
        },
		
		
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
	      this.el.append();
	    }
	  });
    
    BookJS.boot = function(container){
		container = $(container);
		var router = new BookRouter({el:container});    
		Backbone.history.start();	
    
    }


    })(Zepto);