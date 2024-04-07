'use client';

import React, { useEffect } from 'react';
import { getDataFromToken } from './_util/getDataFromToken';
import { useHookstate } from '@hookstate/core';
import { isLoggedIn, tokenId } from './_util/globalState';

const HomePage = () => {
	const loggedInState = useHookstate(isLoggedIn);
	const tokenIdState = useHookstate(tokenId);

	useEffect(() => {
		getDataFromToken().then((data) => {
			if (data !== '') {
				loggedInState.set(true);
				tokenIdState.set(data);
			} else {
				loggedInState.set(false);
				tokenIdState.set('');
			}
		});
	}, []);

	return (
		<div>
			<h1>About Me</h1>
			<p className='pb-5'>
				Founded by second-year college student (me), ManageIt is a dynamic tool
				designed to streamline your daily tasks and boost productivity. my
				passion for organization and efficiency led me to create this platform
				with the aim of helping individuals like you manage their hectic
				schedules with ease.
			</p>
			<p className='pb-5'>
				Whether you&apos;re a student juggling assignments and exams, a
				professional handling multiple projects, or anyone striving to stay on
				top of their responsibilities, ManageIt is your ultimate companion. With
				intuitive features and a user-friendly interface, organizing your tasks,
				setting priorities, and tracking progress has never been simpler.
			</p>
			<p className='pb-5'>
				My commitment to continuous improvement drives us to me regularly update
				and enhance my platform, ensuring that it remains tailored to your
				evolving needs. Join me and the growing community of users who have
				experienced the transformative power of efficient task management.
			</p>
			<p className='pb-5'>
				Take control of your schedule, achieve your goals, and unleash your full
				potential with ManageIt today!
			</p>
		</div>
	);
};

export default HomePage;
