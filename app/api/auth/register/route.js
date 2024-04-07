import { connectToDB } from '@/app/api/dbConfig/dbConf';
import User from '@/app/api/models/userMode';
import { NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connectToDB();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { username, email, password } = reqBody;

		const user = await User.findOne({ email });

		if (user)
			return NextResponse(
				{
					error: 'User already exists',
				},
				{
					status: 400,
				}
			);

		const salt = await bcryptjs.genSalt(10);
		const hashedPwd = await bcryptjs.hash(password, salt);

		const newUser = new User({
			username,
			email,
			password: hashedPwd,
		});

		const savedUser = await newUser.save();

		return NextResponse.json(
			{
				message: 'User registered successfully',
				user: savedUser,
			},
			{
				status: 201,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{
				error: error.message,
				code: error.code,
			},
			{
				status: error.code,
			}
		);
	}
}
