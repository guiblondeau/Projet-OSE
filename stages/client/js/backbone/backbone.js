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

		},

		initialize: function(){
			//_.bindAll(this, render);
			var stages = new Stages();

		},
	});

	// vue ajout stages
	var AddView = Backbone.View.extend({

		initialize:function(){
			console.log("coucou");
			$('#page-principale').hide();
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

})(jQuery);