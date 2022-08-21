import { NextApiRequest, NextApiResponse } from 'next'

import { getAllPages, getAllProducts } from '../../util/util'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// Check for secret to confirm this is a valid request
	if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
		return res.status(401).json({ message: 'Invalid token' })
	}

	try {
		// this should be the actual path not a rewritten path
		// e.g. for "/blog/[slug]" this should be "/blog/post-1"
		const [pages, products] = await Promise.all([
			getAllPages(),
			getAllProducts(),
		])

		const pagePaths = pages.map(({ slug }) => `/${slug}/`)
		const productPaths = products.map(({ slug }) => `/products/${slug}/`)

		await Promise.all(
			[...pagePaths, ...productPaths].map(path => res.revalidate(path)),
		)
		return res.json({ revalidated: true })
	} catch (error) {
		// If there was an error, Next.js will continue
		// to show the last successfully generated page
		console.error(error)
		return res.status(500).send('Error revalidating')
	}
}
