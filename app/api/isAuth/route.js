import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export function GET() {
	const token = cookies().get('token')?.value || '';

	if (!token) {
		return NextResponse.json({
			success: false,
			_id: '',
		});
	} else {
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

		return NextResponse.json({
			success: true,
			_id: decodedToken.id,
		});
	}
}
