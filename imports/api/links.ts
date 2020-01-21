import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

export interface Link {
	_id?: string;
	title: string;
	url: string;
	createdAt: Date;
}

export const Links = new Mongo.Collection<Link>('links');
if (Meteor.isServer) {
	// This code only runs on the server
	Meteor.publish('links', linkPublication);
}

// Meteor.publish('links', linkPublication);

function linkPublication(this: any) {
	return Links.find({
		$or: [ { private: { $ne: true } }, { owner: this.userId } ]
	});
}
