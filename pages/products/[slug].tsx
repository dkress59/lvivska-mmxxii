import { CmsClient } from '../../util/cms-client'
import { WPProduct } from '../../util/types'

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
	const products = await getAllProducts()
	const product = products.find(product => product.slug === params.slug)

	return {
		props: {
			product,
		},
	}
}

const WpProduct = ({ product }: { product: WPProduct }) => {
	//const router = useRouter()

	return (
		<>
			<h1>{product.title.rendered}</h1>
			<h2>{product.acf.subtitle}</h2>
			<br />
			<div
				dangerouslySetInnerHTML={{ __html: product.content.rendered }}
			/>
		</>
	)
}

export default WpProduct
