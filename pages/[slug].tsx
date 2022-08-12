import { ProductsPage } from '../components/products-page'
import { WpPage } from '../components/wp-page'
import { PageProps } from '../util/types'
import { getAllImages, getAllPages, getAllProducts } from '../util/util'

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
	const [media, pages, products] = await Promise.all([
		getAllImages(),
		getAllPages(),
		getAllProducts(),
	])
	const page = pages.find(page => page.slug === params.slug)

	return {
		props: {
			media,
			page,
			products,
		},
	}
}

const Page = (props: PageProps) => {
	const isPageForProducts = props.page.slug === 'products'

	return isPageForProducts ? (
		<ProductsPage {...props} />
	) : (
		<WpPage {...props} />
	)
}

export default Page
