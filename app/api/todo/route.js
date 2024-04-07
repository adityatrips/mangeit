import { NextResponse } from 'next/server';
import { connectToDB } from '../dbConfig/dbConf';
import Todo from '../models/todoModel';

connectToDB();

export async function POST(request) {
	try {
		const { title, description, createdBy } = await request.json();

		const newTodo = new Todo({
			title,
			description,
			createdBy,
		});

		const savedTodo = await newTodo.save();

		return NextResponse.json(savedTodo, {
			status: 201,
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
