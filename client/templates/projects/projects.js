Template.projects.events({
    'submit #createProject': function(e, t) {	
        e.preventDefault();
        var newProjectName = document.getElementById("newProjectName").value;
		var newProjectID = Projects.insert({owner: Meteor.userId(), projectName: newProjectName})
        var newWhoID = Whos.insert({project: newProjectID, whoName: "Name of the user ", description: "Description of the user ", priority: 1});
        var newWhatID = Whats.insert({who: newWhoID, whatName: "Wants to ", priority: 1});
        Hows.insert({howName: "Is able to ", priority: 1, what: newWhatID});
		return false;
    },
	'click .deleteProject' : function(e, t) {
		e.preventDefault();
		Projects.remove(this._id);
		return false;
    },
	'click .openProject' : function(e, t) {
		e.preventDefault();
		Router.go("project.backlog", {_id: this._id});
		return false;
    }
});



Template.projects.helpers({
	projects: function(){
		return Projects.find({}, { sort: { projectName: 1 }});
	}
})
