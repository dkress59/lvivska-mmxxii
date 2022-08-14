import Head from 'next/head'

import { useCart } from '../util/hooks'
import { ProductProps } from '../util/types'
import { getImgSrcSet } from '../util/util'
import { ImagePreloader } from './image-preloader'

export function WpProduct({
	media,
	product: {
		content,
		featured_media,
		title,
		acf: {
			capacity,
			dimensions: { depth, height, width },
			price,
			stock,
			subtitle,
			weight,
			sku,
		},
	},
	products,
}: ProductProps) {
	const { addToCart, removeFromCart, cartItems } = useCart(products)

	const featuredMedia = media.find(
		attachment => attachment.id === featured_media,
	)

	return (
		<>
			<Head>
				<ImagePreloader {...{ media }} />
			</Head>
			{!!featuredMedia && (
				<figure className="product">
					<img
						alt={featuredMedia.alt_text}
						src={featuredMedia.source_url}
						srcSet={getImgSrcSet(featuredMedia)}
					/>
					<figcaption>
						<p>Füllmenge: {capacity} liter</p>
						<p>
							BxHxT: {width}x{height}x{depth}cm
						</p>
						<p>Gewicht: {weight}kg</p>
					</figcaption>
				</figure>
			)}
			<article className="product">
				<h1>{title.rendered}</h1>
				<h2>{subtitle}</h2>
				<br />
				<section className="product-info">
					<div className="quantity">
						<p>
							<button onClick={() => removeFromCart(sku, 1)}>
								-
							</button>
							<span>
								{cartItems.find(
									item => item.product.acf.sku === sku,
								)?.quantity ?? 0}
							</span>
							<button onClick={() => addToCart(sku, 1)}>+</button>
						</p>
						<small>Auf Lager: {stock}</small>
					</div>
					<div className="price">
						<p>Preis: {price}€</p>
						<small>{(price / capacity).toFixed(2)}€/liter</small>
					</div>
				</section>
				<section
					className="description"
					dangerouslySetInnerHTML={{
						__html: content.rendered,
					}}
				/>
			</article>
		</>
	)
}
