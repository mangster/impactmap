Template.who.events({
	'click .deleteWho' : function(e, t) {
		e.preventDefault();
		Whos.remove(this._id);
		return false;
    }
});
