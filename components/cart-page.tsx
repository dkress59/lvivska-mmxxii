import { useCart } from '../util/hooks'
import { CartProps } from '../util/types'

export function CartPage({ products }: CartProps) {
	const { cartItems } = useCart(products)

	if (!cartItems.length)
		return (
			<article id="cart" className="empty">
				<h1>Ihr Warenkorb ist leer.</h1>
			</article>
		)

	return (
		<article id="cart">
			<h1>Warenkorb</h1>

			<section id="items">
				{cartItems.map(({ product, quantity }) => (
					<div key={product.acf.sku}>
						{quantity}x {product.title.rendered}
					</div>
				))}
			</section>
		</article>
	)
}
