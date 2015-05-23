Template.who.events({
	'submit #updateWhoForm': function(e, t) {	
        e.preventDefault();
        var newWhoName = document.getElementById("updateWhoName" + this._id).value;
		var newWhoPriority = document.getElementById("updateWhoPriority" + this._id).value;
		var newDescription = document.getElementById("updateWhoDescription" + this._id).value;
		Whos.update({_id: this._id}, {$set: {whoName: newWhoName, description: newDescription, priority: newWhoPriority}});
		$("#updateWho" +this._id +"Modal").modal('hide');
		return false;
    },
	'submit #createWhatForm': function(e, t) {	
        e.preventDefault();
        var newWhatName = document.getElementById("whatName").value;
		var whoId = this._id;
		Whats.insert({who: whoId, whatName: newWhatName})
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
		return Whats.find({who: this._id}, {sort: {rank: 1} });
	},
	currentWho: function(){
		console.log(Whos.findOne({_id: this._id}));
		return Whos.findOne({_id: this._id});
	}
});

/*
AutoForm.hooks({
  insertWhoForm : {
    onSubmit : function(doc) {
      console.log(doc);
	  doc.impactMap = 200;
      this.done(); //We've finished
      return true; //Let autoForm do his default job now
    }
  }
});

*/
AutoForm.hooks({
	
	
  insertWhoForm: {
	  
	 onSuccess: function(formType, result) {
		 Whos.update({_id: result}, {$set: {impactMap: this.template.data.doc._id} });
	 }
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
