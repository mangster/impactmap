Meteor.publish("projects", function () {
  return Projects.find({$or: [{"public": true},
                             {owner: this.userId}]});
});

Meteor.publish("whos", function () {
    return Whos.find();
});

// Any client may insert, update, or remove a WHO without restriction
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
