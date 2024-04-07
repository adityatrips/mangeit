import { NextResponse } from 'next/server';
import { connectToDB } from '../../dbConfig/dbConf';
import Todo from '../../models/todoModel';

connectToDB();

export async function POST(request) {
	try {
		const { id } = await request.json();

		const todo = await Todo.findByIdAndDelete(id);

		return NextResponse.json(todo, {
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
