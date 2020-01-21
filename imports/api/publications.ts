import { Meteor } from 'meteor/meteor';
import { Tasks } from './collections';

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('tasks', tasksPublication);
}

function tasksPublication(this: any) {
	return Tasks.find({
		$or: [ { private: { $ne: true } }, { owner: this.userId } ]
	});
}
