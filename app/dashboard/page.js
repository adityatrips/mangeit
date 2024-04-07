'use client';

import React from 'react';
import Todos from '../_components/Todos';

import isAuth from '../_util/isAuth';

const DashboardPage = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Todos />
		</div>
	);
};

export default isAuth(DashboardPage);
