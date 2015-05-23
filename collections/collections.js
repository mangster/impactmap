// Post model
ImpactMaps = new Meteor.Collection("impactMaps");

Whos = new Meteor.Collection("whos");

Whos.attachSchema(new SimpleSchema({
		whoName: {
		type: String,
		label: "Name",
		max: 200
	},
		description: {
		type: String,
		label: "Description",
		optional: true,
		max: 1000
	},
	'impactMap': {
		type: String,
		optional: true
	}
}));

Whys = new Meteor.Collection("whys");
Whats = new Meteor.Collection("whats");
Hows = new Meteor.Collection("hows");

