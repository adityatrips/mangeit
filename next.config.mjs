/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'http.cat',
			},
			{
				protocol: 'https',
				hostname: 'http.dog',
			},
		],
	},
};

export default nextConfig;
