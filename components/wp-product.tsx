import Image from 'next/image'

import { ProductProps } from '../util/types'

export function WpProduct({ media, product }: ProductProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === product.featured_media,
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
			<article>
				<h1>{product.title.rendered}</h1>
				<h2>{product.acf.subtitle}</h2>
				<br />
				<div
					dangerouslySetInnerHTML={{
						__html: product.content.rendered,
					}}
				/>
			</article>
		</>
	)
}
