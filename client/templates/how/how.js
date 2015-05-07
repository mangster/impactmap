Template.how.events({
	'click .deleteHow' : function(e, t) {
		e.preventDefault();
		Hows.remove(this._id);
		return false;
    }
});
