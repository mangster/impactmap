// Router configuration

Router.configure({
   layoutTemplate: 'main'
 });

Router.map(function () {
	this.route('home', {
		path: '/',  //overrides the default '/home'
	  });
	  
	this.route('impactMapping');
	this.route('projects');
	this.route('edit');
});

Router.route('/edit/:_id', function () {
	this.render('edit', {
		data: function () {
		  return ImpactMaps.findOne({_id: this.params._id});
		}
	});
}, {
	name: 'edit.show'
});


