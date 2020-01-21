// Utilities
import { Meteor } from 'meteor/meteor';
import { Tasks } from './collections';

export const noAuthError = new Meteor.Error('NOT AUTHORIZED TO DO THIS');
export const isUser = (userId) => userId !== null || '';

// return a user ID when called - ideally using Typescript where values are defined in args and return values are defined in one function
export const isUserId = (userId) => (userId !== null || '' ? userId : false);
// const isTaskOwner = taskId => isUserFunc =>{
//     const task = Tasks.findOne(taskId);
//     return task.owner === isUserId(isUserFunc)
// }

//In order to finish up our private task feature, we need to add checks to our deleteTask and setChecked methods
// to make sure only the task owner can delete or check off a private task:
export const isTaskOwner = (taskId) => (isUserFunc) => {
	const task = Tasks.findOne(taskId);
	let isOwner = task.owner;
	switch (task.private) {
		case true:
			isOwner = task.private && task.owner;
			break;
		default:
			isOwner = task.owner;
			break;
	}
	// isUserFunc is actually checking the userID
	return isOwner === isUserId(isUserFunc);
};

// function to evaluate a condition and throw an error
export const evaluateAndExecute = (condition, error = 'FAILED') => {
	try {
		condition;
	} catch (error) {
		console.error(error.error);
	}
};
