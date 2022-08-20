import Link from 'next/link'
import { Fragment } from 'react'

import { useCart } from '../util/hooks'
import { CartProps, CustomWPMedia, WPProduct } from '../util/types'
import {
	cartItemsToNetto,
	cartItemsToTax,
	cartItemsToTotal,
	getImgSrcSet,
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
	const { cartItems, addToCart, removeFromCart } = useCart(products)

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
								<Link
									href={`/products/${product.slug}`}
									passHref={true}
								>
									<a>
										<img
											alt={image.alt_text}
											src={image.source_url}
											width={image.media_details.width}
											height={image.media_details.height}
											srcSet={getImgSrcSet(image)}
										/>
									</a>
								</Link>
							) : (
								<span />
							)}
							<div>
								<p className="title">
									<h3>{product.title.rendered}</h3>
									<button
										onClick={() =>
											removeFromCart(product.acf.sku, 1)
										}
									>
										-
									</button>
									<span>{quantity}</span>
									<button
										onClick={() =>
											addToCart(product.acf.sku, 1)
										}
									>
										+
									</button>
								</p>
								<small
									dangerouslySetInnerHTML={{
										__html: product.acf.subtitle,
									}}
								/>
							</div>
						</Fragment>
					)
				})}
			</section>
			<Link href="/checkout" passHref>
				<a className="checkout">Jetzt bestellen</a>
			</Link>
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
