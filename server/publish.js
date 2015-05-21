

Meteor.publish("impactMaps", function () {
  return ImpactMaps.find({$or: [{"public": true},
                             {owner: this.userId}]});
});



Meteor.publish("whos", function () {
    return Whos.find();
});

// Any client may insert, update, or remove a post without restriction
Whos.permit(['insert', 'update', 'remove']).apply();




Meteor.publish("whys", function () {
    return Whys.find();
});

Meteor.publish("whats", function () {
    return Whats.find();
});

Meteor.publish("hows", function () {
    return Hows.find();
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