(function($){

	// model
	var Stage = Backbone.model.extend({
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
	var Stages = Backbone.collection.extend({
		model : Stage,

	});

	//view
	var StagesView = Backbone.View.extend({
		
	});

	//router
	var Router = Backbone.Router.extend({

		initialize: function(options) {
			this.el = container;
		},

		routes: {
			"/:id" : "edit",
			"*path": "index",
		},

		index:function(path){
			var index = new StagesView();
		},

		edit:function(id){

		},
	});

})(jQuery);