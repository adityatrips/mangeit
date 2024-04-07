'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Button = ({
	redirectTo = '',
	onClick = () => {
		console.log('Button Clicked');
	},
	variant = 'primary',
	children = 'Oops, no button text!',
	style,
	props,
	className,
}) => {
	const [variantClassName, setVariantClassName] = React.useState('');
	const router = useRouter();

	React.useEffect(() => {
		switch (variant) {
			case 'primary':
				setVariantClassName('bg-primary text-white  hover:scale-105');
				break;
			case 'secondary':
				setVariantClassName('bg-secondary text-white  hover:scale-105');
				break;
			case 'muted':
				setVariantClassName(
					'bg-background border-muted border text-text hover:scale-105'
				);
				break;
		}
	}, []);

	return (
		<button
			{...props}
			onClick={() => {
				if (redirectTo) {
					router.push(redirectTo);
				} else {
					onClick();
				}
			}}
			className={`transition-all duration-100 py-2 px-4 rounded-lg text-text ${variantClassName} ${className}`}
			style={{
				...style,
			}}
		>
			{children}
		</button>
	);
};

export default Button;
