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
		return Hows.find({what: this._id}, {sort: {priority: 1} });
	},
	color: function(){
		return Whos.findOne(this.who).color;
	}
});


Template.what.onRendered(function () {
    $( "#sortable" + this.data._id ).sortable();
    $( "#sortable" + this.data._id ).disableSelection();
    
	var howList = $('#howList'+ this.data._id);
	howList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: ".panel-how", 
			connectWith: ".sortableHowList",
            update: function(event, ui) {
                var newHowPriority = 0;
                
                
                
                //console.log("Moved Item : " + ui.item[0]);
                //console.log("Sender: " + ui.sender);
                //console.log("Target: " + this);
                
                // If moved between lists
                if (ui.sender) {
                    var movedWhoID = ui.item[0].id;
                    var targetWhatID = this.getAttribute("data-id");
                    console.log("ID of moved item: " + movedWhoID);
                    console.log("ID of target list: " + targetWhatID);
                    Hows.update({_id: movedWhoID}, {$set: {what: targetWhatID}});
                }
                /*

                //See if we've moved between lists
                if (ui.sender){
                    var  newHowPriority2 = 0;
                    var senderList = ui.sender[0];
                    var targetListId = this.id;
                    var targetList = $('#howList'+ targetListId);
                    console.log(targetList);
                    console.log(howList);
                    targetList.children().each(function(i) {
                        var li = $(this);
                        if (li.attr("class") == "how"){
                            Hows.update({_id: li.attr("id")}, {$set: {priority: newHowPriority2}});
                            newHowPriority2 += 1;
                        }
                    });
                }*/
                
                howList.children().each(function(i) {
                    var li = $(this);
                    if (li.attr("class") == "how"){
                        Hows.update({_id: li.attr("id")}, {$set: {priority: newHowPriority}});
                        newHowPriority += 1;
                    }
                });
            }
        
	});
    howList.disableSelection();
    
});
