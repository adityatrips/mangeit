import mongoose from 'mongoose';
import User from './userMode';

const todoSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: [true, 'Description is required'],
	},
	completed: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: User,
		required: [true, 'User is required'],
	},
});

export default mongoose.models.todo || mongoose.model('todo', todoSchema);
