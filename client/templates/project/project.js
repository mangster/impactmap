Template.project.events({
	'submit #createWhoForm': function(e, t) {	
        e.preventDefault();
		var impactMapId = this._id;
        var newWhoName = document.getElementById("createWhoName" + this._id).value;
		var newDescription = document.getElementById("createWhoDescription" + this._id).value;
		var newPriority = document.getElementById("createWhoPriority" + this._id).value;
		var newWhoColor = document.getElementById("createWhoColor" + this._id).value;
		Whos.insert({impactMap: impactMapId, whoName: newWhoName, description: newDescription, priority: newPriority, color: newWhoColor})
		$("#createWho" +this._id +"Modal").modal('hide');
		return false;
    },
	'submit #createWho': function(e, t) {	
        e.preventDefault();
        var name = document.getElementById("whoName").value;
		var impactMapId = this._id;
		Whos.insert({impactMap: impactMapId, whoName: name, rank:1})
		return false;
    },
	'submit #createWhy': function(e, t) {	
        e.preventDefault();
        var name = document.getElementById("whyName").value;
		var impactMapId = this._id;
		Whys.insert({impactMap: impactMapId, name: name, rank:1})
		return false;
    },
	'click .goBack' : function(e, t) {
		e.preventDefault();
		Router.go("projects");
		return false;
    }
});


Template.project.helpers({
	test: function(){
		return this.name;
	},
	whos: function(){
		return Whos.find({impactMap: this._id}, {sort: {priority: 1} });
	},
	whys: function(){
		return Whys.find({impactMap: this._id}, {sort: {rank: 1} });
	}
})


Template.project.onRendered(function () {
	var whoList = $('#whoList');
	var whyList = $('#whyList');
	whoList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.panel-heading-who', 
			
            update: function() {
                $('.panel', whoList).each(function(index, elem) {
					 var $listItem = $(elem),
                     newIndex = $listItem.index();
                     // Persist the new indices.
					 Whos.update({_id: this.id}, {$set: {rank: index+1}});
                });
            }
	});
	

	whyList.sortable({
            // Only make the .panel-heading child elements support dragging.
            // Omit this to make then entire <li>...</li> draggable.
            handle: '.moveWhy', 
			
            update: function() {
                $('.panel', whyList).each(function(index, elem) {
					 /*var $listItem = $(elem),
                     newIndex = $listItem.index();*/
                     // Persist the new indices.
					 Whys.update({_id: this.id}, {$set: {rank: index+1}});
                });
            }
	});
	$( "#whyList" ).disableSelection();
	
	
	$("#wholist").on("mouseenter", "li", function(){						
        $(this).find('.hoverToolBar').fadeIn(400);
    }).on("mouseleave", "li", function(){	
        $(this).find('.hoverToolBar').stop().fadeOut(100);
    });
});

/*
$(document).ready(function(){
    $("#whyList").on("mouseenter", "li", function(){						
        $(this).find('.myhover').fadeIn(400);
    }).on("mouseleave", "li", function(){	
        $(this).find('.myhover').stop().fadeOut(100);
    })	
});*/