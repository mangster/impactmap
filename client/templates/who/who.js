Template.who.events({
	'click .deleteWho' : function(e, t) {
		e.preventDefault();
		Whos.remove(this._id);
		return false;
    },
	'submit #createWhat': function(e, t) {	
        e.preventDefault();
        var name = document.getElementById("whatName" + this._id).value;
		var whoId = this._id;
		Whats.insert({who: whoId, name: name, rank:1})
		return false;
    }
});

Template.who.helpers({
	whats: function(){
		return Whats.find({who: this._id}, {sort: {rank: 1} });
	}
});



Template.who.onRendered(function () {
	var whatList = $('#whatList'+ this.data._id);
	whatList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.panel-heading-what', 
			
            update: function() {
                $('.panel', whatList).each(function(index, elem) {
					 var $listItem = $(elem),
                     newIndex = $listItem.index();
                     // Persist the new indices.
					 Whats.update({_id: this.id}, {$set: {rank: index+1}});
                });
            }
	})
});

