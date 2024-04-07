import { connectToDB } from '../../dbConfig/dbConf';
import User from '../../models/userMode';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

connectToDB();

export async function POST(request) {
	try {
		const reqBody = await request.json();
		const { email, password } = reqBody;

		if (!email || !password) {
			return NextResponse.json(
				{
					error: 'Please fill in all fields',
					code: 400,
				},
				{
					status: 400,
				}
			);
		}

		const user = await User.findOne({ email });

		if (!user)
			return NextResponse.json(
				{
					error: 'User not found',
					code: 404,
				},
				{
					status: 404,
				}
			);

		const validPwd = await bcryptjs.compare(password, user.password);

		if (!validPwd)
			return NextResponse.json(
				{
					error: 'Invalid password',
					code: 401,
				},
				{
					status: 401,
				}
			);

		const tokenData = {
			id: user._id,
			email: user.email,
			username: user.username,
		};

		const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
			expiresIn: '1d',
		});

		const resp = NextResponse.json(
			{
				message: 'Login successful',
				success: true,
			},
			{
				status: 200,
			}
		);

		resp.cookies.set('token', token, {
			httpOnly: true,
		});

		return resp;
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
