import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, useState } from 'react'
import { ThreeDots } from 'react-loading-icons'

import { useCart } from '../util/hooks'
import { CartProps, CustomWPMedia, WPProduct } from '../util/types'
import {
	cartItemsToNetto,
	cartItemsToTax,
	cartItemsToTotal,
	createPaymentIntent,
	getImgSrcSet,
} from '../util/util'
import { ImagePreloader } from './image-preloader'

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
	const [isLoading, setIsLoading] = useState(false)
	const {
		cartItems,
		clientSecret,
		setClientSecret,
		addToCart,
		removeFromCart,
	} = useCart(products)
	const router = useRouter()

	function onProceedToCheckout() {
		setIsLoading(true)
		;(async () => {
			try {
				if (!clientSecret)
					setClientSecret(await createPaymentIntent(cartItems))
				await router.push('/checkout')
			} catch (exception) {
				console.error(exception)
			} finally {
				setIsLoading(false)
			}
		})()
	}

	if (!cartItems.length)
		return (
			<article id="cart" className="empty">
				<h1>Ihr Warenkorb ist leer.</h1>
			</article>
		)

	return (
		<>
			<Head>
				<ImagePreloader {...{ media }} />
			</Head>
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
											{/* eslint-disable-next-line @next/next/no-img-element */}
											<img
												alt={image.alt_text}
												src={image.source_url}
												width={
													image.media_details.width
												}
												height={
													image.media_details.height
												}
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
												removeFromCart(
													product.acf.sku,
													1,
												)
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
				<button
					className="checkout"
					disabled={isLoading}
					onClick={onProceedToCheckout}
				>
					Jetzt bestellen{isLoading && <ThreeDots />}
				</button>
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
		</>
	)
}
