'use client';

import React from 'react';
import { getDataFromToken } from '../_util/getDataFromToken';
import axios from 'axios';
import Button from './Button';
import { toast } from 'react-toastify';
import moment from 'moment';

export default function Todos() {
	const [todos, setTodos] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	const getId = async () => {
		return getDataFromToken();
	};

	const getTodos = async (id) => {
		try {
			const res = await axios.post('/api/todo/get-todos', {
				createdBy: id,
			});
			setTodos(res.data);
		} catch (error) {
			toast.error(error.message);
		}

		setLoading(false);
	};

	React.useEffect(() => {
		getId().then((id) => {
			getTodos(id);
		});
	}, []);

	const deleteTodo = async (id) => {
		const todo = await axios.post('/api/todo/delete-todo', {
			id,
		});

		if (todo.status !== 200) {
			toast.error(todo.statusText);
		}

		getId().then((id) => {
			getTodos(id);
		});

		console.log(todo.data);
	};

	if (loading) {
		return (
			<div className='w-full flex justify-center items-center '>
				<h3>Loading...</h3>
			</div>
		);
	}

	return todos.length > 0 ? (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
			{todos.map((todo) => (
				<div
					key={todo._id}
					className='border-muted flex justify-between flex-col border px-10 py-5 rounded-lg min-h-96'
				>
					<div>
						<h3 className='text-primary'>{todo.title}</h3>
						<small className='font-bold uppercase text-secondary'>
							{moment(todo.createdAt).format('LL')}&nbsp; (
							{moment(todo.createdAt).format('hh:mm A')})
						</small>
						<pre className='font-sans max-h-48 whitespace-break-spaces overflow-auto'>
							{todo.description}
						</pre>
					</div>
					<Button
						onClick={() => {
							deleteTodo(todo._id);
						}}
						className='mt-2 w-full'
						variant='primary'
					>
						Delete
					</Button>
				</div>
			))}
		</div>
	) : (
		<div className='w-full flex flex-col justify-center items-center '>
			<h3>No todos found</h3>
			<Button
				className='mt-2'
				variant='muted'
				redirectTo='/create'
			>
				Create a todo
			</Button>
		</div>
	);
}
