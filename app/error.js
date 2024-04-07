'use client';

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Error({ error, reset }) {
	return (
		<div className='h-96 w-[100%] flex justify-center items-center flex-col'>
			<Image
				src={`https://http.cat/${error}.jpg`}
				alt='404'
				width={500}
				height={500}
			/>
			<Link
				className='text-primary hover:text-secondary transition-all duration-200 mt-5'
				href='/'
			>
				Go back to home
			</Link>
		</div>
	);
}
