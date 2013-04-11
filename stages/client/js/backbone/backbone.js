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
			$('#add-stage').hide();
			$('#page-principale').show();
			console.log(collection);
		},

		addStage: function(){
			var addStage = new AddView();
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
			$('#page-principale').hide();
			$('#add-stage').show();

		},

		addStage : function(){
			console.log("coucou");
			var stage = new Stage({
				intitule : $('#intitule').val(),
			});
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

	var app = new StagesApp();
	Backbone.history.start();
	var collection = new Stages();

})(jQuery);