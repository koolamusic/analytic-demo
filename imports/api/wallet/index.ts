import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Wallets } from '../collections';

export function fundWallet(this: any, fund: number) {
	check(fund, Number);

	Wallets.insert({
		balance: 124,
		prevBalance: 10,
		createdAt: new Date(),
		owner: this.userId
	});
}

// export function setPrivate(taskId, setToPrivate) {
// 	check(taskId, String);
// 	check(setToPrivate, Boolean);
// 	const task = Tasks.findOne(taskId);

// 	// Make sure only the task owner can make a task private
// 	if (task.owner !== this.userId) {
// 		throw new Meteor.Error('not-authorized');
// 	}
// 	Tasks.update(taskId, { $set: { private: setToPrivate } });
// }

// export function removeTask(taskId) {
// 	check(taskId, String);
// 	evaluateAndExecute(isTaskOwner(taskId)(this.userId) && Tasks.remove(taskId), noAuthError);
// }

// export function insertTask(text) {
// 	check(text, String);

// 	// Make sure the user is logged in before inserting a task
// 	evaluateAndExecute(
// 		isUser(this.userId) &&
// 			Tasks.insert({
// 				text,
// 				createdAt: new Date(),
// 				owner: this.userId,
// 				username: Meteor.users.findOne(this.userId).username
// 			}),
// 		noAuthError
// 	);
// }
