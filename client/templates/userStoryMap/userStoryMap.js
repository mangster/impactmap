Template.userStoryMap.events({
	'click .closeProject' : function(e, t) {
		e.preventDefault();
		Router.go("projects");
		return false;
    }
});

Template.userStoryMap.helpers({
    activeIfTemplateIs: function (template) {
      var currentRoute = Router.current();
      return currentRoute &&
        template === currentRoute.lookupTemplate() ? 'active' : '';
    }
});