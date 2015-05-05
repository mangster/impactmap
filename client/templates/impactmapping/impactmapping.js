Template.impactMapping.events({
    'submit #createImpactMap': function(e, t) {	
        e.preventDefault();
        var name = document.getElementById("impactMapName").value;
		ImpactMaps.insert({owner: Meteor.userId(), name: name})
		return false;
    },
	'click .editImpactMap' : function(e, t) {
		e.preventDefault();
		Router.go("edit.show", {_id: this._id});
		return false;
    },
	'click .deleteImpactMap' : function(e, t) {
		e.preventDefault();
		ImpactMaps.remove(this._id);
		return false;
    }
});



Template.impactMapping.helpers({
	impactMaps: function(){
		return ImpactMaps.find({}, { sort: { name: 1 }});
	}
})
