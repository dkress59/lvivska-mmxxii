import Link from 'next/link'

import { CustomWPMedia, WPProduct } from '../util/types'
import { getImgSrcSet } from '../util/util'

export function ProductTile({
	media,
	product,
}: {
	media: CustomWPMedia[]
	product: WPProduct
}) {
	const image = media.find(img => img.id === product.featured_media)!

	return (
		<section key={product.slug}>
			<Link href={`/products/${product.slug}`} passHref>
				<a>
					<h2>{product.title.rendered}</h2>
					<img
						src={image.source_url}
						alt={image.alt_text}
						srcSet={getImgSrcSet(image)}
					/>
				</a>
			</Link>
		</section>
	)
}
