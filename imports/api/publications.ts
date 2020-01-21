import { Meteor } from 'meteor/meteor';
<<<<<<< HEAD
import { Tasks, Wallets } from './collections';
=======
import {Chats, Tasks} from './collections';
>>>>>>> origin/chat
import { Links } from './links';

if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('tasks', tasksPublication);
	Meteor.publish('links', linkPublication);
<<<<<<< HEAD
	Meteor.publish('wallet', walletPublication);
=======
	Meteor.publish('chats', chatPublication);
>>>>>>> origin/chat
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

<<<<<<< HEAD
export function walletPublication(this: any) {
	console.log(Wallets);
	return Wallets.find({
		$or: [ { owner: this.userId } ]
	});
=======

export function chatPublication(this: any) {
	return Chats.find({}, { fields: { name: 1, message: 1, createdAt: 1, announcement: 1 }, limit: 100, sort: { createdAt: -1 } }); //we want the 100 most recent messages

>>>>>>> origin/chat
}
