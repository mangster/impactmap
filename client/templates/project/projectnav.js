Template.projectnav.events({
    'click .closeProject' : function(e, t) {
		e.preventDefault();
		Router.go("projects");
		return false;
    }
});

Template.projectnav.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    },
    whos: function(){
		return Whos.find({project: this._id}, {sort: {priority: 1} });
	},
	whys: function(){
		return Whys.find({impactMap: this._id}, {sort: {rank: 1} });
	}
});
