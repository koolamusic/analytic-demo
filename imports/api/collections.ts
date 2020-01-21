import { Mongo } from 'meteor/mongo';

export interface Task {
	_id?: string;
	text: string;
	createdAt: Date;
	owner: string;
	username: string;
}
/**
 * Use the interface to define the nature of the Collection and the Data it requires
 */
export interface Wallet {
	_id?: string;
	text: string;
	createdAt: Date;
	owner: string;
	username: string;
}

export interface Kitchen {
	_id?: string;
	text: string;
	createdAt: Date;
	owner: string;
	username: string;
}

export interface Chat {
	_id?: string;
	name: string,
	message: string,
	createdAt: Date,
	announcement?: boolean
}

export const Tasks = new Mongo.Collection<Task>('tasks');
export const Wallets = new Mongo.Collection<Wallet>('wallet');
export const Kitchens = new Mongo.Collection<Kitchen>('kitchen');
export const Chats = new Mongo.Collection<Chat>('chat');
