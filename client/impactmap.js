// Router configuration

Router.configure({
   layoutTemplate: 'mainLayout'
 });

Router.map(function () {
	this.route('home', {
		path: '/',  //overrides the default '/home'
	  });
	this.route('projects');
	this.route('project');
	this.route('backlog');
	this.route('impactMap');
	this.route('userStoryMap');
	this.route('projectSettings');
});


Router.route('/project/:projectName', function () {
	this.render('project', {
		data: function () {
		  return Projects.findOne({projectName: this.params.projectName});
		}
	});
}, {
	name: 'project.show'
});

Router.route('/project/:projectName/backlog', function () {
	//this.layout("projectLayout");
    this.render('backlog', {
		data: function () {
		  return Projects.findOne({projectName: this.params.projectName});
		}
	});
    this.render("projectnav", {
        to: "projectnavigation",
        data: function () {
		  return Projects.findOne({projectName: this.params.projectName});
		}
    });
    }, {
        name: 'project.backlog'
});

Router.route('/project/:projectName/impactMap', function () {
	//this.layout("projectLayout");
    this.render('impactMap', {
		data: function () {
		  return Projects.findOne({projectName: this.params.projectName});
		}
	});
}, {
	name: 'project.impactMap'
});

Router.route('/project/:projectName/userStoryMap', function () {
	//this.layout("projectLayout");
    this.render('userStoryMap', {
		data: function () {
		  return Projects.findOne({projectName: this.params.projectName});
		}
	});
}, {
	name: 'project.userStoryMap'
});

Router.route('/project/:projectName/projectSettings', function () {
	//this.layout("projectLayout");
    this.render('projectSettings', {
		data: function () {
		  return Projects.findOne({projectName: this.params.projectName});
		}
	});
}, {
	name: 'project.projectSettings'
});


