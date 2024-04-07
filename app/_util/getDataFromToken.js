'use server';

import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export const getDataFromToken = () => {
	const token = cookies().get('token')?.value || '';

	if (!token) {
		return '';
	} else {
		const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

		return String(decodedToken.id);
	}
};
