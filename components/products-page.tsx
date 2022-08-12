import Image from 'next/image'
import Link from 'next/link'

import { PageProps } from '../util/types'

export function ProductsPage({ media, page, products }: PageProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === page.featured_media,
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
				<h1>{page.title.rendered}</h1>
				<br />
				{products.map(product => (
					<section key={product.slug}>
						<Link href={`/products/${product.slug}`} passHref>
							{product.title.rendered}
						</Link>
					</section>
				))}
			</article>
		</>
	)
}
