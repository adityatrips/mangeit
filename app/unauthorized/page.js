'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default function NotFound() {
	return (
		<div className='min-h-96 w-[100%] flex justify-center items-center flex-col'>
			<div className='flex flex-col gap-5 justify-between items-center'>
				<h3>If you are a cat person</h3>
				<Image
					src='https://http.cat/401.jpg'
					alt='404'
					width={500}
					height={500}
				/>
				<h3>If you are a dog person</h3>
				<Image
					src='https://http.dog/401.jpg'
					alt='404'
					width={500}
					height={500}
				/>
			</div>
			<Link
				className='text-primary hover:text-secondary transition-all duration-200 mt-5'
				href='/'
			>
				Go back to home
			</Link>
		</div>
	);
}
