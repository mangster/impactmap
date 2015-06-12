Template.navbar.events({
    'click .open-project' : function(e, t) {
		e.preventDefault();
        Router.go("project.backlog", {projectName: this.projectName});
        $('.in,.open').removeClass('in open');

		return false;
    },
    'submit #createProjectForm': function(e, t) {	
        e.preventDefault();     
        var newProjectName = document.getElementById("createProjectName").value;
		var newProjectDescription = document.getElementById("createProjectDescription").value;        
        var newProjectID = Projects.insert({owner: Meteor.userId(), projectName: newProjectName, description: newProjectDescription})
        var newWhoID = Whos.insert({project: newProjectID, whoName: "Name of the user ", description: "Description of the user ", priority: 1});
        var newWhatID = Whats.insert({who: newWhoID, whatName: "Wants to ", priority: 1});
        Hows.insert({howName: "Is able to ", priority: 1, what: newWhatID});
		$("#createProjectModal").modal('hide');
        Router.go("project.backlog", {projectName: newProjectName});
		return false;
    },

});

Template.navItems.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    },
    currentRoute: function(){
        if (Router.current().params.projectName){
            return Router.current().params.projectName;
        }
        else {
            return "Projects";
        }
		
	},
    projects: function(){
        return Projects.find({}, { sort: { projectName: 1 }});    
    }
});
