import { WPPage } from 'wordpress-api-client'

import { CmsClient } from '../util/cms-client'

const cmsClient = new CmsClient('http://localhost:8080')

async function getAllPages() {
	return await cmsClient.page().dangerouslyFindAll()
}

export async function getStaticPaths() {
	const wpPages = await getAllPages()
	const paths = wpPages.map(({ slug }) => ({
		params: {
			slug,
		},
	}))

	return {
		paths,
		fallback: false, // can also be true or 'blocking'
	}
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const pages = await getAllPages()
	const page = pages.find(page => page.slug === params.slug)

	return {
		props: {
			page,
		},
	}
}

const WpPage = ({ page }: { page: WPPage }) => {
	//const router = useRouter()

	return (
		<>
			<h1>Page: {page.title.rendered}</h1>
			<br />
			<div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
		</>
	)
}

export default WpPage
