import { WpPage } from '../components/wp-page'
import { getAllImages, getAllPages, getAllProducts } from '../util/util'

export async function getStaticProps() {
	const [media, pages, products] = await Promise.all([
		getAllImages(),
		getAllPages(),
		getAllProducts(),
	])
	const page = pages.find(page => page.slug === 'explore')

	return {
		props: {
			media,
			page,
			products,
		},
	}
}

export default WpPage
