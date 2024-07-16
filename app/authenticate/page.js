'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import axios from 'axios';
import Button from '@/app/_components/Button';
import { useHookstate } from '@hookstate/core';
import { isLoggedIn } from '@/app/_util/globalState';
import { toast } from 'react-toastify';

function AuthPage() {
	const loggedInState = useHookstate(isLoggedIn);
	const [user, setUser] = React.useState({
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	});
	const [loading, setLoading] = React.useState(false);
	const router = useRouter();
	const [selectedWindow, setSelectedWindow] = React.useState('login');

	const onRegister = async () => {
		try {
			if (user.password !== user.repeatPassword) {
				console.log('Passwords do not match');
				throw new Error('Passwords do not match');
			}

			setLoading(true);
			const response = await axios.post('/api/auth/register', user);
		} catch (error) {
			toast.error('Registration failed');
		} finally {
			setLoading(false);
		}
	};

	const onLogin = async () => {
		try {
			setLoading(true);
			const response = await axios.post('/api/auth/login', user);
			loggedInState.set(true);
			router.push('/dashboard');
		} catch (error) {
			toast.error('Login failed');
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className='flex justify-center items-center pb-5 gap-2'>
				<Button
					onClick={() => setSelectedWindow('login')}
					variant='muted'
					className={`w-full`}
				>
					<span
						className={`${selectedWindow === 'login' ? 'font-extrabold' : ''}`}
					>
						Login
					</span>
				</Button>
				<Button
					onClick={() => setSelectedWindow('register')}
					variant='muted'
					className={'w-full'}
				>
					<span
						className={`${
							selectedWindow === 'register' ? 'font-extrabold' : ''
						}`}
					>
						Register
					</span>
				</Button>
			</div>
			<div>
				<div className={`${selectedWindow === `register` && 'hidden'}`}>
					<div className='flex flex-col mx-auto w-3/4 gap-2'>
						<h1>Welcome back, login!</h1>
						<input
							type='text'
							autoCapitalize='none'
							autoComplete='email webauthn'
							id='email'
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							placeholder='Enter your email address'
							className='bg-background border border-primary px-4 py-2 rounded-md'
						/>
						<input
							type='password'
							id='password'
							autoComplete='current-password webauthn'
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							placeholder='Enter your password'
							className='bg-background border border-primary px-4 py-2 rounded-md'
						/>
						<div className='flex flex-col md:flex-row gap-2 justify-end'>
							<Button
								variant='primary'
								onClick={onLogin}
							>
								Login
							</Button>
							<Button
								onClick={() => {
									setSelectedWindow('register');
								}}
								variant='muted'
							>
								No account? Register
							</Button>
						</div>
					</div>
				</div>
				<div className={`${selectedWindow === `login` && 'hidden'}`}>
					<div className='flex flex-col mx-auto w-3/4 gap-2'>
						<h1>New? Register!</h1>
						<input
							type='text'
							autoCapitalize='none'
							autoComplete='username webauthn'
							id='username'
							value={user.username}
							onChange={(e) => setUser({ ...user, username: e.target.value })}
							placeholder='Choose your username'
							className='bg-background border border-primary px-4 py-2 rounded-md'
						/>
						<input
							type='text'
							autoCapitalize='none'
							autoComplete='email webauthn'
							id='email'
							value={user.email}
							onChange={(e) => setUser({ ...user, email: e.target.value })}
							placeholder='Enter your email address'
							className='bg-background border border-primary px-4 py-2 rounded-md'
						/>
						<input
							type='password'
							id='password'
							autoComplete='current-password webauthn'
							value={user.password}
							onChange={(e) => setUser({ ...user, password: e.target.value })}
							placeholder='Choose your password'
							className='bg-background border border-primary px-4 py-2 rounded-md'
						/>
						<input
							type='password'
							id='password'
							autoComplete='current-password webauthn'
							value={user.repeatPassword}
							onChange={(e) =>
								setUser({ ...user, repeatPassword: e.target.value })
							}
							placeholder='Repeat your password'
							className='bg-background border border-primary px-4 py-2 rounded-md'
						/>
						<div className='flex flex-col md:flex-row gap-2 justify-end'>
							<Button onClick={onRegister}>Register</Button>
							<Button
								onClick={() => {
									setSelectedWindow('login');
								}}
								variant='muted'
							>
								Have an account? Login
							</Button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AuthPage;
