Template.navbar.events({
    'click .open-project' : function(e, t) {
		e.preventDefault();
        Router.go("project.backlog", {projectName: this.projectName});
        $('.in,.open').removeClass('in open');

		return false;
    },
    'submit #createProjectForm': function(e, t) {	
        e.preventDefault();     
        var newProjectName = document.getElementById("createProject-projectName").value;
		var newProjectDescription = document.getElementById("createProject-description").value;        
        var newProjectID = Projects.insert({owner: Meteor.userId(), projectName: newProjectName, description: newProjectDescription}, function(error, result){
            if (error){
                for (var i = 0; i < error.invalidKeys.length; i++){
                    $('#errorElement').popover('destroy');
                    var errorElement = document.getElementById("createProject-" + error.invalidKeys[i].name);
                    $(errorElement).popover({
                        trigger: "manual",
                        placement: "top",
                        html: true,
                        content: '<span class="glyphicon popover-warning glyphicon-exclamation-sign"></span>' + error.message,
                        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                      });
                      $(errorElement).popover("show");
                      setTimeout(function() {$(errorElement).popover('destroy')},3000);
                }   
                return false;
            }
            else {
                var newWhoID = Whos.insert({project: newProjectID, whoName: "Name of the user ", description: "Description of the user ", priority: 1});
                var newWhatID = Whats.insert({who: newWhoID, whatName: "Wants to ", priority: 1});
                Hows.insert({howName: "Is able to ", priority: 1, what: newWhatID});
                $("#createProjectModal").modal('hide');
                Router.go("project.backlog", {projectName: newProjectName});
                return false;
            }
        });
        
        
        
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
