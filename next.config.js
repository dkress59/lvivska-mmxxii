/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['localhost', '192.168.180.10'],
	},
	reactStrictMode: true,
	swcMinify: true,
	trailingSlash: true,
}

module.exports = nextConfig
