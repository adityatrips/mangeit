import { NextResponse } from 'next/server';
import { connectToDB } from '../../dbConfig/dbConf';
import Todo from '../../models/todoModel';

connectToDB();

export async function POST(request) {
	const { createdBy } = await request.json();

	try {
		const todos = await Todo.find({
			createdBy,
		});
		return NextResponse.json(todos, {
			status: 200,
		});
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
