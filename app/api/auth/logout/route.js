import { NextResponse } from 'next/server';

export async function GET(request) {
	try {
		const resp = NextResponse.json(
			{
				message: 'Logout successful',
			},
			{
				status: 200,
			}
		);

		resp.cookies.set('token', '', {
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
