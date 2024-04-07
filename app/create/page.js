'use client';

import React from 'react';
import Button from '../_components/Button';
import axios from 'axios';
import { getDataFromToken } from '../_util/getDataFromToken';
import isAuth from '../_util/isAuth';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const CreatePage = () => {
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const router = useRouter();

	const createTodo = () => {
		getDataFromToken().then(async (token) => {
			console.log(`${token}`);
			try {
				const response = await axios.post('/api/todo', {
					title,
					description,
					createdBy: `${token}`,
				});

				const data = await response.data;

				setTitle('');
				setDescription('');

				toast.success('Todo added successfully');
			} catch (error) {
				toast.error('Failed to add a todo');
			}
		});
	};

	return (
		<div className='flex flex-col gap-2 w-3/4 mx-auto'>
			<h1>Add a todo</h1>
			<input
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				type='text'
				placeholder='Enter your todo title'
				className='bg-background border border-primary px-4 py-2 rounded-md'
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				type='text'
				placeholder='Enter your todo description'
				className='bg-background border border-primary px-4 py-2 rounded-md'
			/>
			<div className='gap-2 flex justify-end'>
				<Button onClick={createTodo}>Create a todo</Button>
				<Button
					onClick={() => {
						setTitle('');
						setDescription('');
					}}
					variant='muted'
				>
					Clear
				</Button>
			</div>
		</div>
	);
};

export default isAuth(CreatePage);
