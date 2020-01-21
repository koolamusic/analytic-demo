import { Meteor } from 'meteor/meteor';
import { Tasks } from './collections';
import { Links } from './links';

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('tasks', tasksPublication);
	Meteor.publish('links', linkPublication);
}

export function tasksPublication(this: any) {
	return Tasks.find({
		$or: [ { private: { $ne: true } }, { owner: this.userId } ]
	});
}

export function linkPublication(this: any) {
	return Links.find({
		$or: [ { private: { $ne: true } }, { owner: this.userId } ]
	});
}
