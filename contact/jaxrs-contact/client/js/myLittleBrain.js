(function($) {


        window.Contact = Backbone.Model.extend({

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
					return "Le nom et le prenom ne peuvent être vides";
				}
			}
			
			
			
		
			
        });

        

      window.Book = Backbone.Collection.extend({
		model : Contact,
		localStorage : new Store("contact"),
		
		initialize : function(){
			//this.url = "../getAll"
			this.book = true;
			console.log('Book constructor');
		},
		
		toJSON : function(){
			return '{ \'book\': '+this.toJSON()+'}';
		}
		
		
	  
	  });
	  
	  window.BookView = Backbone.View.extend({
        el : $('#contact-container'),
        initialize : function() {
			console.log("BookView constructor");
            this.template = $('#contact-template').html();
			
			
			_.bindAll(this, 'render');
			this.collection = new Book();
            this.collection.bind('change', this.render);
			this.collection.bind('add', this.render);
            this.collection.bind('remove', this.render);
        },

		
			
        render : function() {
			
			
            var renderedContent = Mustache.to_html(this.template, this.collection.toJSON());
			
			$(this.el).html(renderedContent);
            return this;
        },
		
		
		
		

    });


    })(Zepto);