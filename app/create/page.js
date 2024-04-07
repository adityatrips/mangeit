'use client';

import React, { useEffect } from 'react';
import Button from '../_components/Button';
import axios from 'axios';
import { getDataFromToken } from '../_util/getDataFromToken';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useHookstate } from '@hookstate/core';
import { isLoggedIn, tokenId } from '../_util/globalState';

const CreatePage = () => {
	const [title, setTitle] = React.useState('');
	const [description, setDescription] = React.useState('');
	const [loading, setLoading] = React.useState(false);
	const [token, setToken] = React.useState('');
	const router = useRouter();
	const loggedInState = useHookstate(isLoggedIn);
	const tokenIdState = useHookstate(tokenId);

	const createTodo = async () => {
		setLoading(true);
		try {
			if (!title || !description)
				return toast.error('Please fill all the fields');

			const response = await axios.post('/api/todo', {
				title,
				description,
				createdBy: `${tokenIdState.get()}`,
			});

			setTitle('');
			setDescription('');
			toast.success('Todo added successfully');
		} catch (error) {
			toast.error('Failed to add a todo');
		}
		setLoading(false);
	};
	const isAuth = async () => {
		const response = await axios.get('/api/isAuth');

		if (response.data.success) {
			setToken(response.data._id);
			tokenIdState.set(response.data._id);
			loggedInState.set(true);
		} else {
			return router.push('/unauthorized');
		}
	};

	useEffect(() => {
		isAuth();
	}, []);

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
					disabled={loading}
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

export default CreatePage;
