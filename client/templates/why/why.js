Template.why.events({
	'click .deleteWhy' : function(e, t) {
		e.preventDefault();
		Whys.remove(this._id);
		return false;
    }
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