Template.what.events({
	'click .deleteWhat' : function(e, t) {
		e.preventDefault();
		Whats.remove(this._id);
		return false;
    },
	'submit #createHowForm': function(e, t) {	
        e.preventDefault();
        var newHowName = document.getElementById("createHowName" + this._id).value;
		var newHowPriority = document.getElementById("createHowPriority" + this._id).value;
		var whatId = this._id;
		Hows.insert({what: whatId, howName: newHowName, priority: newHowPriority})
		$("#createHow" +this._id +"Modal").modal('hide');
		return false;
    },
	'submit #updateWhatForm': function(e, t) {	
        e.preventDefault();
        var newWhatName = document.getElementById("updateWhatName" + this._id).value;
		var newWhatPriority = document.getElementById("updateWhatPriority" + this._id).value;
		Whats.update({_id: this._id}, {$set: {whatName: newWhatName, priority: newWhatPriority}});
		$("#updateWhat" +this._id +"Modal").modal('hide');
		return false;
    },
});


Template.what.helpers({
	hows: function(){
		return Hows.find({what: this._id}, {sort: {rank: 1} });
	}
});


Template.what.onRendered(function () {
	var howList = $('#howList'+ this.data._id);
	howList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.panel-heading-how', 
			
            update: function() {
                $('.panel', howList).each(function(index, elem) {
					 var $listItem = $(elem),
                     newIndex = $listItem.index();
                     // Persist the new indices.
					 Hows.update({_id: this.id}, {$set: {rank: index+1}});
                });
            }
	});
});
