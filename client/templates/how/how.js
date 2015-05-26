Template.how.events({
	'click .deleteHow' : function(e, t) {
		e.preventDefault();
		Hows.remove(this._id);
		return false;
    },
	'submit #updateHowForm': function(e, t) {	
        e.preventDefault();
        var newHowName = document.getElementById("updateHowName" + this._id).value;
		var newHowPriority = document.getElementById("updateHowPriority" + this._id).value;
		Hows.update({_id: this._id}, {$set: {howName: newHowName, priority: newHowPriority}});
		$("#updateHow" +this._id +"Modal").modal('hide');
		return false;
    },
});

Template.how.helpers({
	color: function(){
		what = Whats.findOne(this.what);
		who = Whos.findOne(what.who);
		return who.color;
	}
});