import { Meteor } from 'meteor/meteor';
import { insertTask, removeTask, setChecked, setPrivate } from './tasks';

Meteor.methods({
	'tasks.insert': insertTask,
	'tasks.remove': removeTask,
	'tasks.setChecked': setChecked,
	'tasks.setPrivate': setPrivate
});
