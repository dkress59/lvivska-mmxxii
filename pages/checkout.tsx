import { CheckoutPage } from '../components/checkout-page'
import { getAllProducts } from '../util/util'

export async function getStaticProps() {
	const products = await getAllProducts()

	return {
		props: {
			products,
		},
	}
}

export default CheckoutPage
