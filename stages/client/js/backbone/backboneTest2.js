(function($){

	// model
	var Stage = Backbone.Model.extend({
		urlRoot : "http://localhost:8080/jaxrs-stage/stages",
		defaults: {
			pays:"",
			entreprise : "",
			adresse:"",
			domaine:"",
			intitule:"",
			description:"",
			salaire:"",
			option:"",
			avantages:"",
			langue:"",
			latitude : 0,
			longitude : 0,
			notesPertinence : {
				pertinent : 0,
				nonPertinent : 0,
			},
			rankingGrade : 0,
		},
	});

	//collection
	var Stages = Backbone.Collection.extend({
		model : Stage,
		url : "http://localhost:8080/jaxrs-stage/stages",
	});

	//vue des stages
	var StagesView = Backbone.View.extend({
		el : $('#page-principale'),

		events:{
			'click button#add-btn': 'addStage',
			'click button#stage-edit': 'editStage',
			'click button#b': 'b',
			'click button#search-btn' : 'searchStage',
			'click input#pertinent' : 'pertinent',
			'click input#nonPertinent' : 'nonPertinent'
		},

		initialize: function(){
			_.bindAll(this, 'render');
			stageEnCours = -1;
			collection = new Stages();
          	this.render();
		},

		pertinent : function(){
			var id = 0;
			for (var mod in collection._byId){
				console.log($('#collapse'+mod).hasClass('accordion-body  in collapse'));
				if ($('#collapse'+mod).hasClass('accordion-body  in collapse')){
					id = mod;
					console.log(mod);
				}
            };
            for (var mod in collection._byId){
				console.log($('#collapse2'+mod).hasClass('accordion-body  in collapse'));
				if ($('#collapse2'+mod).hasClass('accordion-body  in collapse')){
					id = mod;
					console.log(mod);
				}
            };
			var stage = new Stage({
				intitule : collection.get(id).attributes.intitule,
				entreprise : collection.get(id).attributes.entreprise,
				pays : collection.get(id).attributes.pays,
				domaine : collection.get(id).attributes.domaine,
				option : collection.get(id).attributes.option,
				description : collection.get(id).attributes.description,
				adresse : collection.get(id).attributes.adresse,
				salaire : collection.get(id).attributes.salaire,
				avantages : collection.get(id).attributes.avantages,
				langue : collection.get(id).attributes.langue,
				latitude : collection.get(id).attributes.latitude,
				longitude : collection.get(id).attributes.longitude,
				notesPertinence : {
					pertinent : collection.get(id).attributes.notesPertinence.pertinent+1,
					nonPertinent : collection.get(id).attributes.notesPertinence.nonPertinent,
				},
				rankingGrade : collection.get(id).attributes.rankingGrade,
			});
			jQuery.ajax({
				      		url: 'http://localhost:8080/jaxrs-stage/stages/'+id,
				      		type: 'PUT',
				      		data: JSON.stringify(stage.toJSON()),
				      		dataType: 'json',
				      		beforeSend: function(req) {
				        		req.setRequestHeader('Content-Type', 'application/json');
				      		},
				      		success: function(data) {
				      		},
				      		error: function(jqXHR, textStatus, errorThrown) {
				          		// TODO: trigger event error
				          		console.log(textStatus);
				          		console.log(errorThrown);
				        		}
						});
		},


		nonPertinent : function(){
			var id = 0;
			for (var mod in collection._byId){
				console.log($('#collapse'+mod).hasClass('accordion-body  in collapse'));
				if ($('#collapse'+mod).hasClass('accordion-body  in collapse')){
					id = mod;
					console.log(mod);
				}
            };
            for (var mod in collection._byId){
				console.log($('#collapse2'+mod).hasClass('accordion-body  in collapse'));
				if ($('#collapse2'+mod).hasClass('accordion-body  in collapse')){
					id = mod;
					console.log(mod);
				}
            };
			var stage = new Stage({
				intitule : collection.get(id).attributes.intitule,
				entreprise : collection.get(id).attributes.entreprise,
				pays : collection.get(id).attributes.pays,
				domaine : collection.get(id).attributes.domaine,
				option : collection.get(id).attributes.option,
				description : collection.get(id).attributes.description,
				adresse : collection.get(id).attributes.adresse,
				salaire : collection.get(id).attributes.salaire,
				avantages : collection.get(id).attributes.avantages,
				langue : collection.get(id).attributes.langue,
				latitude : collection.get(id).attributes.latitude,
				longitude : collection.get(id).attributes.longitude,
				notesPertinence : {
					pertinent : collection.get(id).attributes.notesPertinence.pertinent,
					nonPertinent : collection.get(id).attributes.notesPertinence.nonPertinent+1,
				},
				rankingGrade : collection.get(id).attributes.rankingGrade,
			});
			jQuery.ajax({
	      		url: 'http://localhost:8080/jaxrs-stage/stages/'+id,
	      		type: 'PUT',
	      		data: JSON.stringify(stage.toJSON()),
	      		dataType: 'json',
	      		beforeSend: function(req) {
	        		req.setRequestHeader('Content-Type', 'application/json');
	      		},
	      		success: function(data) {
	      		},
	      		error: function(jqXHR, textStatus, errorThrown) {
	          		// TODO: trigger event error
	          		console.log(textStatus);
	          		console.log(errorThrown);
	        		}
			});
		},

		b : function(){
			index.render();
		},

		addStage: function(){
			addStage.render();
		},

		editStage: function(){
			var id = 0;
			for (var mod in collection._byId){
				console.log($('#collapse'+mod).hasClass('accordion-body  in collapse'));
				if ($('#collapse'+mod).hasClass('accordion-body  in collapse')){
					id = mod;
					console.log(mod);
				}
            };
            for (var mod in collection._byId){
				console.log($('#collapse2'+mod).hasClass('accordion-body  in collapse'));
				if ($('#collapse2'+mod).hasClass('accordion-body  in collapse')){
					id = mod;
					console.log(mod);
				}
            };
            stageEnCours = id;
            console.log(collection.get(stageEnCours));
			addStage.editStage(id);
		},

		render : function(){
      		stageEnCours = -1;
        	collection.fetch({
        		success : function(){
        			console.log(collection);
        			// var stage  = collection.get();
        			// console.log(stage);
        			$('#add-stage').slideUp();
					$('#page-principale').slideDown();
       				$('#accordion').empty();
   					$('#accordion').append(accor);
   					var val= collection.toJSON();
       				$('#accordion').html(Mustache.render($('#accordion').html(),{book : val}));
       				console.log(collection);
        		}
        	});
        	console.log(collection);
        	
		},

		searchStage : function(){
			var domaine = $('#domaineR').val();
			var option = $('#optionR').val();
			var pays = $('#recherchePays').val();
			var entreprise = $('#rechercheEntreprise').val();
			var langue = $('#rechercheLangue').val();
			var salaire = $('#rechercheSalaire').val();
			if (domaine == "Aucun"){
				domaine = "";
			};
			if (option == "Aucun"){
				option = "";
			};
			var search = { "stage": 
				{
					"domaine" : ""+domaine,
					"option" : ""+option,
					"pays" : ""+pays,
					"entreprise" : ""+entreprise,
					"langue" : ""+langue,
					"salaire" : ""+salaire,
				}
			};
			var searchJSON = JSON.stringify(search);
			console.log(searchJSON);
			searchView.render(searchJSON);
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
				jQuery.ajax({
      				url: "http://localhost:8080/jaxrs-stage/stages/"+stageEnCours,
      				type: 'DELETE',
      				dataType: 'json',
      				beforeSend: function(req) {
        				req.setRequestHeader('Content-Type', 'application/json');
      				},
      				success: function(data) {
      					index.render();
      				},
      				error: function(jqXHR, textStatus, errorThrown) {
      					index.render();
          				// TODO: trigger event error
          				//console.log(textStatus);
          				//console.log(errorThrown);
        			}
      			});
			}else{
				index.render();
			}
		},

		addStage : function(){
			if (stageEnCours == -1){
				var geocoder = new google.maps.Geocoder();
				var address = $('#adresse').val();
				geocoder.geocode( { 'address': address}, function(results, status) {
	  				if (status == google.maps.GeocoderStatus.OK) {
	   					var latitude = results[0].geometry.location.lat();
	    				var longitude = results[0].geometry.location.lng();
	    				var stage = new Stage({
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
							latitude : ""+latitude,
							longitude : ""+longitude,
						});
						jQuery.ajax({
	      					url: "http://localhost:8080/jaxrs-stage/stages",
	      					type: 'POST',
	      					data: JSON.stringify(stage.toJSON()),
	      					dataType: 'json',
	      					beforeSend: function(req) {
	        					req.setRequestHeader('Content-Type', 'application/json');
	      					},
	      					success: function(data) {
	        					//that.trigger('addContactOK', data);
	        					$('#intitule').val("");
								$('#entreprise').val("");
								$('#pays').val("");
								$('#domaine').val("");
								$('#option').val("");
								$('#description').val("");
								index.render();
	      					},
	      					error: function(jqXHR, textStatus, errorThrown) {
	        					console.log(textStatus);
	        					console.log(errorThrown);
	      					}
	    				});

	  				} 
				}); 
			}else {
				var geocoder = new google.maps.Geocoder();
				var address = $('#adresse').val();
				geocoder.geocode( { 'address': address}, function(results, status) {
	  				if (status == google.maps.GeocoderStatus.OK) {
	   					var latitude = results[0].geometry.location.lat();
	    				var longitude = results[0].geometry.location.lng();
	    				console.log(collection.get(stageEnCours).attributes.notesPertinence);
	    				var stage = new Stage({
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
							latitude : ""+latitude,
							longitude : ""+longitude,
							notesPertinence : {
								pertinent : collection.get(stageEnCours).attributes.notesPertinence.pertinent,
								nonPertinent : collection.get(stageEnCours).attributes.notesPertinence.nonPertinent,
							},
							rankingGrade : collection.get(stageEnCours).attributes.rankingGrade,
						});
						console.log(stage);
						jQuery.ajax({
				      		url: 'http://localhost:8080/jaxrs-stage/stages/'+stageEnCours,
				      		type: 'PUT',
				      		data: JSON.stringify(stage.toJSON()),
				      		dataType: 'json',
				      		beforeSend: function(req) {
				        		req.setRequestHeader('Content-Type', 'application/json');
				      		},
				      		success: function(data) {
				      			$('#intitule').val("");
								$('#entreprise').val("");
								$('#pays').val("");
								$('#domaine').val("");
								$('#option').val("");
								$('#description').val("");
								index.render();
				      		},
				      		error: function(jqXHR, textStatus, errorThrown) {
				          		// TODO: trigger event error
				          		console.log(textStatus);
				          		console.log(errorThrown);
				        		}
						});
	  				} 
				});
			}
		},

		editStage : function(id){
			stage = collection.get(id);
			$('#page-principale').slideUp();
			$('#add-stage').slideDown();
			$('#intitule').val(stage.get("intitule"));
			$('#entreprise').val(stage.get("entreprise"));
			$('#description').val(stage.get("description"));
			$('#pays').val(stage.get("pays"));
			$('#domaine').val(stage.get("domaine"));
			$('#option').val(stage.get("option"));
			$('#description').val(stage.get("description"));
			$('#adresse').val(stage.get("adresse"));
			$('#salaire').val(stage.get("salaire"));
			$('#avantages').val(stage.get("avantages"));
			$('#langue').val(stage.get("langue"));
		}
	});

	var SearchView = Backbone.View.extend({

		render : function(search){
			stageEnCours = -1;
        	jQuery.ajax({
					url: "http://localhost:8080/jaxrs-stage/stages/recherche",
					type: 'POST',
					data: search,
					dataType: 'json',
					beforeSend: function(req) {
						req.setRequestHeader('Content-Type', 'application/json');
					},
					success: function(data) {
						console.log(collection);
        				$('#stagesGlobal').slideUp();
						$('#stagesRecherche').slideDown();
       					$('#accordion2').empty();
   						$('#accordion2').append(accor2);
   						console.log(data);
       					$('#accordion2').html(Mustache.render($('#accordion2').html(),{book2 : data}));
					},
					error: function(jqXHR, textStatus, errorThrown) {
						console.log(textStatus);
						console.log(errorThrown);
					}
			});	
		},
	});

	//router
	var StagesApp = Backbone.Router.extend({

		routes: {
			":id" : "edit",
			"*path": "index",
		},

		index:function(path){
		},

		edit:function(id){
			console.log("passe dans edit");
		}
	});

	var stageEnCours;
	var accor = $("#accordion").html();
	var accor2 = $("#accordion2").html();
	var app = new StagesApp();
	Backbone.history.start();
	var collection = new Stages();
	var index = new StagesView();
	var addStage = new AddView();
	var searchView = new SearchView();
})(jQuery);