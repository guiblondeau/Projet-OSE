(function($){

	// model
	var Stage = Backbone.Model.extend({
		defaults: {
			id:0,
			pays:"nowhere",
			adresse:"nowhere",
			domaine:"none",
			intitule:"none",
			description:"none",
			salaire:"0€",
			option:"gsi bien sur",
			avantages:"aucun",
			langue:"francais sauf si t'as pas l'IELTS"
		},
	});

	//collection
	var Stages = Backbone.Collection.extend({
		model : Stage,

	});

	//vue des stages
	var StagesView = Backbone.View.extend({
		el : $('#page-principale'),

		events:{
			'click button#add-btn': 'addStage',
		},

		initialize: function(){
			//_.bindAll(this, render);
			
			console.log(collection);
			this.render();
		},

		addStage: function(){
			var addStage = new AddView();
		},

		render : function(){
			$('#add-stage').slideUp();
			$('#page-principale').slideDown();
       		$('#accordion').empty();
   			$('#accordion').append(accor);
          	var val= collection.toJSON();
          	$('#accordion').html(Mustache.render($('#accordion').html(),{book : val}));
		}
	});

	// vue ajout stages
	var AddView = Backbone.View.extend({

		el:$('#add-stage'),

		events:{
			'click button#add-validation': 'addStage',
			'click button#add-deletion': 'deleteStage',
		},

		initialize:function(){
			$('#page-principale').slideUp();
			$('#add-stage').slideDown();

		},

		addStage : function(){
			console.log("coucou");
			var stage = new Stage({
				id : counter,
				intitule : $('#intitule').val(),
			});
			counter++;
			console.log(counter);
			console.log(stage);
			collection.add(stage);
			var index = new StagesView();
		},
	});

	//router
	var StagesApp = Backbone.Router.extend({

		routes: {
			":id" : "edit",
			"*path": "index",
		},

		index:function(path){
			var index = new StagesView();
			console.log("passe dans defaut");
		},

		edit:function(id){
			var index = new AddView();
			console.log("passe dans edit");
		}
	});

	var accor = $("#accordion").html();
	var app = new StagesApp();
	Backbone.history.start();
	var collection = new Stages();
	var counter=0;

})(jQuery);