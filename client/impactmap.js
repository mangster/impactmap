// Router configuration

Router.configure({
   layoutTemplate: 'main'
 });

Router.map(function () {
	this.route('home', {
		path: '/',  //overrides the default '/home'
	  });
	this.route('projects');
	this.route('project');
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


