Template.who.events({
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
	  before: {
    // Replace `formType` with the form `type` attribute to which this hook applies
    insert: function(doc) {
      // Potentially alter the doc
      
	  
	  doc.impactMapId = Template.parentData(1)._id;
	  // Then return it or pass it to this.result()
      return doc;
	  //this.result(doc);
      //return false; (synchronous, cancel)
      //this.result(doc); (asynchronous)
      //this.result(false); (asynchronous, cancel)
    }
  },
	 onSuccess: function(formType, result) {
		 //console.log(Template.parentData(1)._id);
		 //test = Template.parentData();
		 console.log(this.template.data.doc._id);
		 Whos.update({_id: result}, {$set: {impactMap: this.template.data.doc._id} });
		 //console.log(result);
		 
	 },
	onSubmit: function (insertDoc, updateDoc, currentDoc) {
	  this.done();
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

Template.insertWhoForm.helpers({
	document: function(){
		//console.log(ImpactMaps.findOne({_id: this._id}));
		impactMap = ImpactMaps.findOne({_id: this._id});
		console.log(impactMap._id);
		return impactMap._id;
		//return ImpactMaps.findOne({id: this._id});
	}
});