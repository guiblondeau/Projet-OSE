(function($) {

        window.Contact = Backbone.Model.extend({

            defaults : {
                id : "???",
				prenom:"j'ai pas de nom",
				nom:"j'ai pas de prenom",
                numero:"911"
            },

            initialize : function() {
                console.log('Contact Constructor');
				
				
				
            },
			
			
			
		
			
        });


    })(Zepto);
	
	
	(function($) {

        

      window.Book = Backbone.Collection.extend({
		model : Contact,
		localStorage : new Store("contact"),
		
		initialize : function(){
			this.url = "http://localhost:8080/jaxrs-service/book/getAll"
			console.log('Book constructor');
		}
		
		
	  
	  });
	  
	  window.DocView = Backbone.View.extend({
        el : $('#contact-container'),
        initialize : function() {
            this.template = _.template($('#contact-template').html());
        },

        render : function() {
            var renderedContent = this.template(this.model.toJSON());
            $(this.el).html(renderedContent);
            return this;
        }

    });

    })(Zepto);