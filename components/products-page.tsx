import Head from 'next/head'

import { PageProps } from '../util/types'
import { getImgSrcSet } from '../util/util'
import { ImagePreloader } from './image-preloader'
import { ProductTile } from './product-tile'

export function ProductsPage({ media, page, products }: PageProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === page.featured_media,
	)

	return (
		<>
			<Head>
				<ImagePreloader {...{ media }} />
			</Head>
			<article id="products">
				{!!featuredMedia && (
					<img
						id="background"
						alt={featuredMedia.alt_text}
						src={featuredMedia.source_url}
						srcSet={getImgSrcSet(featuredMedia)}
					/>
				)}
				<h1>{page.title.rendered}</h1>
				<div id="stage">
					{products.map(product => (
						<ProductTile
							key={product.slug}
							{...{ media, product }}
						/>
					))}
				</div>
			</article>
		</>
	)
}
