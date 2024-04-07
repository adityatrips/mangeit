'use client';

import React from 'react';
import { getDataFromToken } from '../_util/getDataFromToken';
import axios from 'axios';
import Button from '../_components/Button';
import { toast } from 'react-toastify';
import moment from 'moment';
import { useHookstate } from '@hookstate/core';
import { isLoggedIn, tokenId } from '../_util/globalState';
import Link from 'next/link';

const DashboardPage = () => {
	const [todos, setTodos] = React.useState([]);
	const [loading, setLoading] = React.useState(true);
	const [token, setToken] = React.useState('');
	const loggedInState = useHookstate(isLoggedIn);
	const tokenIdState = useHookstate(tokenId);

	const getTodos = async () => {
		try {
			console.log(tokenIdState.get().toString());
			const res = await axios.post('/api/todo/get-todos', {
				createdBy: tokenIdState.get().toString(),
			});
			setTodos(res.data);
			console.log(res.data);
		} catch (error) {
			toast.error(error.message);
		}

		setLoading(false);
	};

	const isAuth = async () => {
		const response = await axios.get('/api/isAuth');

		if (response.data.success) {
			setToken(response.data._id);
			loggedInState.set(true);
			tokenIdState.set(response.data._id);
			getTodos(token);
			return response.data._id;
		} else {
			redirect('/authenticate');
			loggedInState.set(false);
			return '';
		}
	};

	React.useEffect(() => {
		isAuth();
	}, []);

	const deleteTodo = async (id) => {
		const todo = await axios.post('/api/todo/delete-todo', {
			id,
		});

		if (todo.status !== 200) {
			toast.error(todo.statusText);
		}

		getTodos();

		console.log(todo.data);
	};

	if (loading) {
		return (
			<div className='w-full flex justify-center items-center '>
				<h3>Loading...</h3>
			</div>
		);
	}
	return (
		<div className='w-[100%]'>
			<h1>Dashboard</h1>
			{todos.length > 0 ? (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
					{todos.map((todo, index) => {
						return (
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
						);
					})}
				</div>
			) : (
				<div className='w-full h-96 justify-center items-center flex gap-2 flex-col'>
					<h3>No todos found</h3>
					<div className='flex flex-col md:flex-row gap-2 w-1/2'>
						<Button
							style={{
								flex: 1,
							}}
							variant='primary'
							onClick={() => {
								getTodos();
							}}
						>
							Refresh
						</Button>
						<Button
							style={{
								flex: 1,
							}}
							variant='muted'
							redirectTo='/create'
						>
							Create one now
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default DashboardPage;
