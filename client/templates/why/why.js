Template.why.events({
	'click .deleteWhy' : function(e, t) {
		e.preventDefault();
		Whys.remove(this._id);
		return false;
    }
});
