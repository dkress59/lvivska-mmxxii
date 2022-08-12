import { Fragment } from 'react'

import { useCart } from '../util/hooks'
import { CartProps, CustomWPMedia, WPProduct } from '../util/types'
import {
	cartItemsToNetto,
	cartItemsToTax,
	cartItemsToTotal,
} from '../util/util'

function getImageForProduct({
	media,
	product,
}: {
	media: CustomWPMedia[]
	product: WPProduct
}) {
	return media.find(({ id }) => id === product.featured_media)
}

export function CartPage({ media, products }: CartProps) {
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
				{cartItems.map(({ product, quantity }) => {
					const image = getImageForProduct({ media, product })
					return (
						<Fragment key={product.acf.sku}>
							{image ? (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									alt={image.alt_text}
									src={image.source_url}
									width={image.media_details.width}
									height={image.media_details.height}
								/>
							) : (
								<span />
							)}
							<p>
								{quantity}x {product.title.rendered}
							</p>
						</Fragment>
					)
				})}
			</section>
			<section id="summary">
				<aside>
					<p>Netto:</p>
					<p>{cartItemsToNetto(cartItems, 19)}€</p>
					<p>MwSt.:</p>
					<p>{cartItemsToTax(cartItems, 19)}€</p>
					<p>Total:</p>
					<p>{cartItemsToTotal(cartItems)}€</p>
				</aside>
			</section>
		</article>
	)
}
