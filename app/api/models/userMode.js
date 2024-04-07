import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "Username can't be empty"],
		unique: true,
	},
	email: {
		type: String,
		required: [true, "Email can't be empty"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password can't be empty"],
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
	forgotPasswordToken: String,
	forgotPasswordTokenExpiry: Date,
	verifyToken: String,
	verifyTokenExpiry: Date,
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
