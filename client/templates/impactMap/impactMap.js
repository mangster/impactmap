Template.impactMap.events({
	'submit #createWhoForm': function(e, t) {	
        e.preventDefault();
		var projectId = this._id;
        var newWhoName = document.getElementById("createWhoName" + this._id).value;
		var newDescription = document.getElementById("createWhoDescription" + this._id).value;
		var newPriority = document.getElementById("createWhoPriority" + this._id).value;
		var newWhoColor = document.getElementById("createWhoColor" + this._id).value;
		var newWhoID = Whos.insert({project: projectId, whoName: newWhoName, description: newDescription, priority: newPriority, color: newWhoColor});
        var newWhatID = Whats.insert({who: newWhoID, whatName: "Wants to ", priority: 1});
        Hows.insert({howName: "Is able to ", priority: 1, what: newWhatID});
		$("#createWho" +this._id +"Modal").modal('hide');
		return false;
    },
    'submit #updateProjectForm': function(e, t) {	
        e.preventDefault();
        var newProjectName = document.getElementById("updateProjectName" + this._id).value;
		var newProjectDescription = document.getElementById("updateProjectDescription" + this._id).value;
		Projects.update({_id: this._id}, {$set: {projectName: newProjectName, description: newProjectDescription}});
		$("#updateProject" +this._id +"Modal").modal('hide');
		return false;
    },
    'submit #createWhyForm': function(e, t) {	
        e.preventDefault();
		var projectId = this._id;
        var newWhyName = document.getElementById("createWhyName" + this._id).value;
		var newWhyPriority = document.getElementById("createWhyPriority" + this._id).value;
        Whys.insert({whyName: newWhyName, priority: newWhyPriority, project: projectId});
		$("#createWhy" +this._id +"Modal").modal('hide');
		return false;
    },
    'click .panel-project' : function(e, t) {
		e.preventDefault();
        $("#updateProject" +this._id +"Modal").modal("show");
		return false;
    },

    'click .closeProject' : function(e, t) {
		e.preventDefault();
		Router.go("projects");
		return false;
    }
});

Template.impactMap.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    },
    whos: function(){
		return Whos.find({project: this._id}, {sort: {priority: 1} });
	},
	whys: function(){
		return Whys.find({project: this._id}, {sort: {priority: 1} });
	}
});



Template.impactMap.onRendered(function () {
	var whoList = $('#whoList');
	var whyList = $('#whyList');
	whoList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.panel-heading-who', 
			
            update: function() {
                $('.panel', whoList).each(function(index, elem) {
					 var $listItem = $(elem),
                     newIndex = $listItem.index();
                     // Persist the new indices.
					 Whos.update({_id: this.id}, {$set: {rank: index+1}});
                });
            }
	});
	

	whyList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.moveWhy', 
			
            update: function() {
                $('.panel', whyList).each(function(index, elem) {
					 /*var $listItem = $(elem),
                     newIndex = $listItem.index();*/
                     // Persist the new indices.
					 Whys.update({_id: this.id}, {$set: {rank: index+1}});
                });
            }
	});
	$( "#whyList" ).disableSelection();
	
	
	$("#wholist").on("mouseenter", "li", function(){						
        $(this).find('.hoverToolBar').fadeIn(400);
    }).on("mouseleave", "li", function(){	
        $(this).find('.hoverToolBar').stop().fadeOut(100);
    });
});