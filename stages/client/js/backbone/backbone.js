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

	//view
	var StagesView = Backbone.View.extend({
		el : $ ('#page-principale'),

		initialize: function(){
			console.log("coucou");
			el.append("cacahuete");
		},
	});

	//router
	var StagesApp = Backbone.Router.extend({

		initialize: function(options) {
			
		},

		routes: {
			"/:id" : "edit",
			"*path": "index",
		},

		index:function(path){
			console.log("hey");
			var index = new StagesView();
		},

		edit:function(id){
		}
	});

	var app = new StagesApp();

})(jQuery);