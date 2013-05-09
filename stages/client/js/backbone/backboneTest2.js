(function($){

	// model
	var Stage = Backbone.Model.extend({
		urlRoot : "http://localhost:8080/jaxrs-stage/stages",
		defaults: {
			pays:"nowhere",
			entreprise : "flander's company",
			adresse:"nowhere",
			domaine:"none",
			intitule:"none",
			description:"none",
			salaire:"0€",
			option:"gsi bien sur",
			avantages:"aucun",
			langue:"francais sauf si t'as pas l'IELTS",
			latitude : 0,
			longitude : 0,
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
		},

		initialize: function(){
			_.bindAll(this, 'render');
			stageEnCours = -1;
			collection = new Stages();
          	this.render();
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
            stageEnCours = id;
            console.log(collection.get(stageEnCours));
			addStage.editStage(id);
		},

		render : function(){
      		stageEnCours = -1;
      		jQuery.ajax({
          		url: "http://localhost:8080/jaxrs-stage/stages",
          		type: 'GET',
          		dataType: 'json',
          		success: function(data) {
            		var stages = data;
            		collection = new Stages();
            		for (var stag in stages){
            			collection.add(stages[stag]);
            		}
            		console.log(collection);
            		$('#add-stage').slideUp();
					$('#page-principale').slideDown();
         			$('#accordion').empty();
          			$('#accordion').append(accor);
          			var val= collection.toJSON();
          			$('#accordion').html(Mustache.render($('#accordion').html(),{book : val}));
          		},
          		error: function(jqXHR, textStatus, errorThrown) {
            		that.trigger('getAllContactNOTOk');
            		// TODO: trigger event error
            		console.log(textStatus);
            		console.log(errorThrown);
          		}
        	});
		},
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
      				},
      				error: function(jqXHR, textStatus, errorThrown) {
          				// TODO: trigger event error
          				//console.log(textStatus);
          				//console.log(errorThrown);
        			}
      			});
				index.render();
			}else{
				index.render();
			}
		},

		addStage : function(){
			if (stageEnCours == -1){
				//var geocoder = new google.maps.Geocoder();
				var address = $('#adresse').val();
				//geocoder.geocode( { 'address': address}, function(results, status) {
	  				//if (status == google.maps.GeocoderStatus.OK) {
	   					//var latitude = results[0].geometry.location.lat();
	    				//var longitude = results[0].geometry.location.lng();
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
							//latitude : ""+latitude,
							//longitude : ""+longitude,
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
	      					},
	      					error: function(jqXHR, textStatus, errorThrown) {
	        					console.log(textStatus);
	        					console.log(errorThrown);
	      					}
	    				});
						$('#intitule').val("");
						$('#entreprise').val("");
						$('#pays').val("");
						$('#domaine').val("");
						$('#option').val("");
						$('#description').val("");
						index.render();
	  				//} 

				//}); 
			}else {
				/*jQuery.ajax({
				      url: 'http://localhost:8080/jaxrs-contact/contacts/editContact/'+$('#idE').val(),
				      type: 'PUT',
				      data: JSON.stringify(contact),
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
				});*/
			}	
		},

		editStage : function(id){
			stage = collection.get(id);
			collection.remove(stage);
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
	var app = new StagesApp();
	Backbone.history.start();
	var collection = new Stages();
	var index = new StagesView();
	var addStage = new AddView();
})(jQuery);