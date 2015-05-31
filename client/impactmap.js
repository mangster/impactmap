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


Router.route('/project/:_id', function () {
	this.render('project', {
		data: function () {
		  return Projects.findOne({_id: this.params._id});
		}
	});
}, {
	name: 'project.show'
});

Router.route('/project/:_id/backlog', function () {
	//this.layout("projectLayout");
    this.render('backlog', {
		data: function () {
		  return Projects.findOne({_id: this.params._id});
		}
	});
    this.render("projectnav", {
        to: "projectnavigation",
        data: function () {
		  return Projects.findOne({_id: this.params._id});
		}
    });
    }, {
        name: 'project.backlog'
});

Router.route('/project/:_id/impactMap', function () {
	//this.layout("projectLayout");
    this.render('impactMap', {
		data: function () {
		  return Projects.findOne({_id: this.params._id});
		}
	});
}, {
	name: 'project.impactMap'
});

Router.route('/project/:_id/userStoryMap', function () {
	//this.layout("projectLayout");
    this.render('userStoryMap', {
		data: function () {
		  return Projects.findOne({_id: this.params._id});
		}
	});
}, {
	name: 'project.userStoryMap'
});

Router.route('/project/:_id/projectSettings', function () {
	//this.layout("projectLayout");
    this.render('projectSettings', {
		data: function () {
		  return Projects.findOne({_id: this.params._id});
		}
	});
}, {
	name: 'project.projectSettings'
});


