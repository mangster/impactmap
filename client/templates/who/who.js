Template.who.events({
	'submit #updateWhoForm': function(e, t) {	
        e.preventDefault();
        var newWhoName = document.getElementById("updateWhoName" + this._id).value;
		var newWhoPriority = document.getElementById("updateWhoPriority" + this._id).value;
		var newDescription = document.getElementById("updateWhoDescription" + this._id).value;
		var newWhoColor = document.getElementById("updateWhoColor" + this._id).value;
		Whos.update({_id: this._id}, {$set: {whoName: newWhoName, description: newDescription, priority: newWhoPriority, color: newWhoColor}});
		// TODO change color for all sub-items as well
		$("#updateWho" +this._id +"Modal").modal('hide');
		return false;
    },
    'click .panel-who' : function(e, t) {
		e.preventDefault();
        $("#updateWho" +this._id +"Modal").modal("show");
		return false;
    },
	'submit #createWhatForm': function(e, t) {	
        e.preventDefault();
        var newWhatName = document.getElementById("createWhatName" + this._id).value;
		var newWhatPriority = document.getElementById("createWhatPriority" + this._id).value;
		var whoId = this._id;
		var newWhatID = Whats.insert({who: whoId, whatName: newWhatName, priority: newWhatPriority});
        Hows.insert({howName: "Is able to ", priority: 1, what: newWhatID});
		$("#createWhat" +this._id +"Modal").modal('hide');
		return false;
    },
	'click .deleteWho' : function(e, t) {
		e.preventDefault();
		Whos.remove(this._id);
		return false;
    },
	'click .saveEditWho' : function(e, t) {
		e.preventDefault();
		//Whos.remove(this._id);
		newName = document.getElementById("whoName").value;
		console.log(newName);
		Whos.update({_id: this.id}, {$set: {name: newName} });
		return false;
    }
});

Template.who.helpers({
	whats: function(){
		return Whats.find({who: this._id}, {sort: {priority: 1} });
	},
	currentWho: function(){
		console.log(Whos.findOne({_id: this._id}));
		return Whos.findOne({_id: this._id});
	},
    priorityColor: function(){
        if (this.priority > 0 && this.priority < 7){
            return this.priority;
        }
        else {
            return 0;   
        }
    }
});

Template.who.onRendered(function () {
	var whatList = $('#whatList'+ this.data._id);
	//console.log(this.data._id);
	//console.log("#updateWhoColor" + this._id);
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
	});
});
