Template.projects.events({
    'submit #createImpactMap': function(e, t) {	
        e.preventDefault();
        var name = document.getElementById("impactMapName").value;
		ImpactMaps.insert({owner: Meteor.userId(), name: name})
		return false;
    },
	'click .openProject' : function(e, t) {
		e.preventDefault();
		Router.go("project.show", {_id: this._id});
		return false;
    },
	'click .deleteImpactMap' : function(e, t) {
		e.preventDefault();
		ImpactMaps.remove(this._id);
		return false;
    }
});



Template.projects.helpers({
	impactMaps: function(){
		return ImpactMaps.find({}, { sort: { name: 1 }});
	}
})
