'use client';

import React from 'react';
import Link from 'next/link';
import { useHookstate } from '@hookstate/core';
import { isLoggedIn } from '../_util/globalState';
import Image from 'next/image';
import LinkedIn from '@/public/linkedin.svg';
import WhatsApp from '@/public/whatsapp.svg';
import Instagram from '@/public/instagram.svg';

export default function Footer() {
	const loggedInState = useHookstate(isLoggedIn);

	return (
		<footer>
			<div className='flex justify-around items-center p-5 h-64 border-t border-muted border-b'>
				<div>
					<h2 className='uppercase font-bold'>Sitemap</h2>
					<ul>
						<li>
							<Link href='/'>Home</Link>
						</li>
						{loggedInState.get() ? (
							<li>
								<Link href='/dashboard'>Dashboard</Link>
							</li>
						) : (
							<li>
								<Link href='/authenticate'>About</Link>
							</li>
						)}
					</ul>
				</div>
				<div>
					<h2 className='uppercase font-bold'>Contact Me</h2>
					<div className='flex flex-col'>
						<Link
							className='flex gap-2 items-center hover:text-primary transition-all duration-200'
							_blank='_blank'
							href='https://wa.me/+919810028236'
						>
							<Image
								alt='WhatsApp'
								src={WhatsApp}
							/>
							WhatsApp
						</Link>
						<Link
							className='flex gap-2 items-center hover:text-primary transition-all duration-200'
							target='_blank'
							href='https://www.linkedin.com/in/aditya-tripathi-at04'
						>
							<Image
								alt='LinkedIn'
								src={LinkedIn}
							/>
							LinkedIn
						</Link>
						<Link
							className='flex gap-2 items-center hover:text-primary transition-all duration-200'
							target='_blank'
							href='https://instagram.com/i_adityatripathi2412'
						>
							<Image
								alt='Instagram'
								src={Instagram}
							/>
							Instagram
						</Link>
					</div>
				</div>
			</div>
			<p className='text-sm text-center py-5'>
				© {new Date().getFullYear()} ManageIt
			</p>
		</footer>
	);
}
