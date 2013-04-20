(function($){

	// model
	var Stage = Backbone.Model.extend({
		defaults: {
			id:0,
			pays:"nowhere",
			entreprise : "flander's company",
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
			'click button#stage-edit': 'editStage',
		},

		initialize: function(){
			//_.bindAll(this, render);
			$.ajax({
        		url : "index4.html",
       			cache : false,
        		success : function(html){
        			stageEnCours = -1;
         			$('#accordion').empty();
          			$('#accordion').append(accor);
          			var val= collection.toJSON();
          			$('#accordion').html(Mustache.render($('#accordion').html(),{book : val}));
       			},
        		error : function(XMLHttpRequest, textStatus, errorThrown){
          			alert();
        		}
      		});
		},

		addStage: function(){
			addStage.render();
		},

		editStage: function(){
			var id = 0;
			var trouve = false;
			while (!trouve){
				trouve = $('#collapse'+id).hasClass('accordion-body  in collapse');
				id++;
			}
			id--;//il y aura un pb quand on editera un contact (decalage d'indice)
			stageEnCours = id;
			addStage.editStage(id)
		},

		render : function(){
      		$.ajax({
        		url : "index4.html",
       			cache : false,
        		success : function(html){
        			stageEnCours = -1;
        			$('#add-stage').slideUp();
					$('#page-principale').slideDown();
         			$('#accordion').empty();
          			$('#accordion').append(accor);
          			var val= collection.toJSON();
          			$('#accordion').html(Mustache.render($('#accordion').html(),{book : val}));
       			},
        		error : function(XMLHttpRequest, textStatus, errorThrown){
          			alert();
        		}
      		});
		}
	});

	// vue ajout stages
	var AddView = Backbone.View.extend({

		el : $('#add-stage'),

		events:{
			'click button#add-validation':'addStage',
			'click button#add-deletion': 'deleteStage',
		},

		initialize:function(){
		},

		render : function(){
			$('#page-principale').slideUp();
			$('#add-stage').slideDown();
		},

		deleteStage : function(){
			if (stageEnCours != -1){
				stage = collection.get(stageEnCours);
				collection.remove(stage);
				index.render();
			}else{
				index.render();
			}
		},

		addStage : function(){
			var stage = new Stage({
				id : counter,
				intitule : $('#intitule').val(),
				entreprise : $('#entreprise').val(),
				pays : $('#pays').val(),
				domaine : $('#domaine').val(),
				option : $('#option').val(),
				description : $('#description').val(),
				adresse : $('#adresse').val(),
				salaire : $('#salaire').val(),
				avantages : $('#avantages').val(),
				langue : $('#langue').val(),
			});
			counter++;
			console.log(counter);
			console.log(stage);
			collection.add(stage);
			$('#intitule').empty();
			index.render();
		},

		editStage : function(id){
			stage = collection.get(id);
			collection.remove(stage);
			$('#page-principale').slideUp();
			$('#add-stage').slideDown();
			$('#intitule').val(stage.get("intitule"));
			$('#pays').val(stage.get("pays"));
			$('#domaine').val(stage.get("domaine"));
			$('#option').val(stage.get("option"));
		}
	});

	//router
	var StagesApp = Backbone.Router.extend({

		routes: {
			":id" : "edit",
			"*path": "index",
		},

		index:function(path){
			console.log("passe dans defaut");
		},

		edit:function(id){
			console.log("passe dans edit");
		}
	});

	var stageEnCours;
	var accor = $("#accordion").html();
	var app = new StagesApp();
	Backbone.history.start();
	var collection = new Stages();
	var counter=0;
	var index = new StagesView();
	var addStage = new AddView();
})(jQuery);