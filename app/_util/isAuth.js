'use client';
import { usePathname, useRouter } from 'next/navigation';
import { getDataFromToken } from './getDataFromToken';

export default function isAuth(Component) {
	return function IsAuth(props) {
		const router = useRouter();
		const pathname = usePathname();

		const publicUrls = ['/', '/authenticate'];

		getDataFromToken().then((data) => {
			if (data === '') {
				router.push('/authenticate');
			} else {
				return <Component {...props} />;
			}
		});
		return <Component {...props} />;
	};
}
