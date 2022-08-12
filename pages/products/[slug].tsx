import { WpProduct } from '../../components/wp-product'
import { CmsClient } from '../../util/cms-client'
import { getAllImages } from '../../util/util'

const cmsClient = new CmsClient()

async function getAllProducts() {
	return await cmsClient.product().dangerouslyFindAll()
}

export async function getStaticPaths() {
	const wpProducts = await getAllProducts()
	const paths = wpProducts.map(({ slug }) => ({
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
	const [media, products] = await Promise.all([
		getAllImages(),
		getAllProducts(),
	])
	const product = products.find(product => product.slug === params.slug)

	return {
		props: {
			media,
			product,
		},
	}
}

export default WpProduct
