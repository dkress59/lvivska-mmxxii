import WpApiClient, { WPPage } from 'wordpress-api-client'

const cmsClient = new WpApiClient('http://localhost:8080')

export async function getStaticPaths() {
	const wpPages = (await cmsClient.page().find()) as WPPage[]
	const paths = wpPages.filter(Boolean).map(({ slug }) => ({
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
	const pages = (await cmsClient.page().find()) as WPPage[]
	const page = pages.filter(Boolean).find(page => page.slug === params.slug)

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
			<div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
		</>
	)
}

export default WpPage
