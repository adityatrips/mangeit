'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Button from './Button';
import { useHookstate } from '@hookstate/core';
import { isLoggedIn } from '../_util/globalState';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Navbar() {
	const loggedInState = useHookstate(isLoggedIn);
	const router = useRouter();
	const sidebarRef = useRef();

	const signOut = async () => {
		const res = await axios.get('/api/auth/logout').then(() => {
			isLoggedIn.set(false);
			router.push('/');
		});
	};

	const toggleSidebar = () => {
		if (sidebarRef.current.classList.contains('-left-full')) {
			sidebarRef.current.classList.remove('-left-full');
			sidebarRef.current.classList.add('left-0');
		} else {
			sidebarRef.current.classList.remove('left-0');
			sidebarRef.current.classList.add('-left-full');
		}
	};

	return (
		<>
			<nav className='flex z-30 fixed w-full bg-background justify-between items-center px-10 border-b border-muted h-16 '>
				<div
					onClick={toggleSidebar}
					className='md:hidden flex justify-center items-center cursor-pointer'
				>
					<span className='material-icons-round'>menu</span>
				</div>
				<Link href='/'>
					<h2 className='w-full md:w-fit text-center'>ManageIt.</h2>
				</Link>
				<ul className='hidden md:flex justify-center items-center gap-10'>
					<li>
						<Link href='/'>Home</Link>
					</li>
					{loggedInState.get() ? (
						<>
							<li>
								<Link href='/dashboard'>Dashboard</Link>
							</li>
							<li>
								<Link href='/create'>Create</Link>
							</li>
							<Button onClick={() => signOut()}>Signout</Button>
						</>
					) : (
						<li>
							<Link href='/authenticate'>Authenticate</Link>
						</li>
					)}
				</ul>
			</nav>

			<div
				className='-left-full transition-all duration-300 fixed md:hidden top-16 header w-[75vw] bg-background border-r border-muted h-[calc(100vh-4rem)]'
				ref={sidebarRef}
			>
				<div className='flex flex-col justify-center items-center'>
					<Link
						onClick={toggleSidebar}
						className='py-5 hover:bg-primary hover:text-text cursor-pointer w-full text-center transition-all duration-200'
						href='/'
					>
						Home
					</Link>
					{loggedInState.get() ? (
						<>
							<Link
								onClick={toggleSidebar}
								className='py-5 hover:bg-primary hover:text-text cursor-pointer w-full text-center transition-all duration-200'
								href='/dashboard'
							>
								Dashboard
							</Link>
							<Link
								onClick={toggleSidebar}
								className='py-5 hover:bg-primary hover:text-text cursor-pointer w-full text-center transition-all duration-200'
								href='/create'
							>
								Create
							</Link>
							<Button
								className={'my-5'}
								onClick={() => signOut()}
							>
								Signout
							</Button>
						</>
					) : (
						<Link
							onClick={toggleSidebar}
							className='py-5 hover:bg-primary hover:text-text cursor-pointer w-full text-center transition-all duration-200'
							href='/authenticate'
						>
							Authenticate
						</Link>
					)}
				</div>
			</div>
		</>
	);
}
