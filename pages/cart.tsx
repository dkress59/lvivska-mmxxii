import { CartPage } from '../components/cart-page'
import { getAllImages, getAllProducts } from '../util/util'

export async function getStaticProps() {
	const [media, products] = await Promise.all([
		getAllImages(),
		getAllProducts(),
	])

	return {
		props: {
			media,
			products,
		},
	}
}

export default CartPage
