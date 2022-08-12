import Image from 'next/image'

import { useCart } from '../util/hooks'
import { ProductProps } from '../util/types'

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
	const { addToCart, removeFromCart } = useCart(products)

	const featuredMedia = media.find(
		attachment => attachment.id === featured_media,
	)

	return (
		<>
			{!!featuredMedia && (
				<figure>
					<Image
						alt={featuredMedia.alt_text}
						layout="fill"
						objectFit="contain"
						objectPosition="right"
						priority={true}
						src={featuredMedia.source_url}
					/>
				</figure>
			)}
			<article className="product">
				<h1>{title.rendered}</h1>
				<h2>{subtitle}</h2>
				<br />
				<section className="product-info">
					<p>Füllmenge: {capacity} liter</p>
					<p>
						BxHxT: {width}x{height}x{depth}cm
					</p>
					<p>
						Preis: {price}€ <small>{price / capacity}€/liter</small>
					</p>
					<p>Auf Lager: {stock}</p>
					<p>Gewicht: {weight}kg</p>
				</section>
				<section
					dangerouslySetInnerHTML={{
						__html: content.rendered,
					}}
				/>
				<br />
				<br />
				<button onClick={() => addToCart(sku, 1)}>+1</button>
				<br />
				<br />
				<button onClick={() => removeFromCart(sku, 1)}>-1</button>
			</article>
		</>
	)
}
