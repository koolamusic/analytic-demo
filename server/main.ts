import { Meteor } from 'meteor/meteor';
import '../imports/api/publications';

// import { Links } from '/imports/api/links';
// function insertLink(title: string, url: string) {
// 	Links.insert({ title, url, createdAt: new Date() });
// }

Meteor.startup(() => {
	// If the Links collection is empty, add some data.
});
