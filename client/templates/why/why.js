Template.why.events({
	'click .deleteWhy' : function(e, t) {
		e.preventDefault();
		Whys.remove(this._id);
		return false;
    },
    'click .panel-why' : function(e, t) {
		e.preventDefault();
        $("#updateWhy" +this._id +"Modal").modal("show");
		return false;
    },
    'submit #updateWhyForm': function(e, t) {	
        e.preventDefault();
        var newWhyName = document.getElementById("updateWhyName" + this._id).value;
		var newWhyPriority = document.getElementById("updateWhyPriority" + this._id).value;
		Whys.update({_id: this._id}, {$set: {whyName: newWhyName, priority: newWhyPriority}});
		$("#updateWhy" +this._id +"Modal").modal('hide');
		return false;
    },
});





/*
Template.why.onRendered(function () {
	$("#myclient").on("mouseenter", "li", function(){						
        $(this).find('.myhover').fadeIn(400);
    }).on("mouseleave", "li", function(){	
        $(this).find('.myhover').stop().fadeOut(100);
    })	
});

*/