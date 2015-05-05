
//example, for geting "other" and "things" userdata
Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find({_id: this.userId},
                             {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }
});
/*
Meteor.publish("impactMaps", function () {
	return ImpactMaps.find({});
});*/

Meteor.publish("impactMaps", function () {
  return ImpactMaps.find({$or: [{"public": true},
                             {owner: this.userId}]});
});
/*
Meteor.publish("whos", function (impactMapId) {
  check(impactMapId, String);
  return whos.find({impactMap: impactMapId});
});*/


Meteor.publish("whos", function () {
    return Whos.find();
});


/*
// Publish all nodes for a given map
Meteor.publish("mapNodes", function (impactMapId) {
  check(impactMapId, String);
  return MapNodes.find({impactMap: impactMapId});
});

// Publish the set of impact maps the logged-in user can see.
Meteor.publish("impactMaps", function () {
  return ImpactMaps.find({$or: [{"public": true},
                             {owner: this.userId}]});
});
*/