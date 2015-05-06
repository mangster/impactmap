Template.edit.events({
	'submit #createWho': function(e, t) {	
        e.preventDefault();
        var name = document.getElementById("whoName").value;
		var impactMapId = this._id;
		Whos.insert({impactMap: impactMapId, name: name, rank:1})
		return false;
    },
	'click .goBack' : function(e, t) {
		e.preventDefault();
		Router.go("impactMapping");
		return false;
    }
});


Template.edit.helpers({
	test: function(){
		return this.name;
	},
	whos: function(){
		return Whos.find({impactMap: this._id}, {sort: {rank: 1} });
		//return Whos.find({_id: this._id}, { sort: { name: 1 }});
	}
})


Template.edit.onRendered(function () {
	//TODO sätt id till id, för att komma åt collection item för att ändra ordning permanent
	var panelList = $('#draggablePanelList');
	panelList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.panel-heading', 
			
            update: function() {
                $('.panel', panelList).each(function(index, elem) {
					 var $listItem = $(elem),
                     newIndex = $listItem.index();
                     // Persist the new indices.
					 Whos.update({_id: this.id}, {$set: {rank: index}});
                });
            }
	});
});
