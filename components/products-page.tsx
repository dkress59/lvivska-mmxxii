import Head from 'next/head'

import { PageProps } from '../util/types'
import { getImgSrcSet } from '../util/util'
import { ProductTile } from './product-tile'

export function ProductsPage({
	media,
	page: { featured_media, title, yoast_head_json },
	products,
}: PageProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === featured_media,
	)

	return (
		<article id="products">
			{!!yoast_head_json && (
				<Head>
					<title>{yoast_head_json.title}</title>
					<meta
						property="og:title"
						content={yoast_head_json.og_title}
					/>
					<meta
						property="og:description"
						content={yoast_head_json.og_description}
					/>
					{yoast_head_json.og_image?.map(img => (
						<meta
							key={img.url}
							property="og:image"
							content={img.url}
						/>
					))}
					<meta
						property="og:type"
						content={yoast_head_json.og_type}
					/>
					<meta
						property="og:locale"
						content={yoast_head_json.og_locale}
					/>
					<meta
						property="og:site_name"
						content={yoast_head_json.og_site_name}
					/>
					<meta property="og:url" content={yoast_head_json.og_url} />
				</Head>
			)}
			{!!featuredMedia && (
				<img
					id="background"
					alt={featuredMedia.alt_text}
					src={featuredMedia.source_url}
					srcSet={getImgSrcSet(featuredMedia)}
				/>
			)}
			<h1>{title.rendered}</h1>
			<div id="stage">
				{products.map(product => (
					<ProductTile key={product.slug} {...{ media, product }} />
				))}
			</div>
		</article>
	)
}
