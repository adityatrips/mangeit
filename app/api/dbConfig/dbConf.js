import mongoose from 'mongoose';

export async function connectToDB() {
	try {
		mongoose.connect(process.env.MONGO);
		const connection = mongoose.connection;

		connection.on('connected', () => {
			console.log('MongoDB connection established');
		});

		connection.on('error', (err) => {
			console.log('MongoDB connection error' + err);
			process.exit();
		});
	} catch (error) {
		console.log(error);
	}
}
