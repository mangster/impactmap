Template.projects.events({
    'submit #createProject': function(e, t) {	
        e.preventDefault();
        var newProjectName = document.getElementById("newProjectName").value;
		Projects.insert({owner: Meteor.userId(), projectName: newProjectName})
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
