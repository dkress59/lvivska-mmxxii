import Image from 'next/image'

import { PageProps } from '../util/types'

export function WpPage({ media, page }: PageProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === page.featured_media,
	)

	return (
		<>
			{!!featuredMedia && (
				<figure className="page">
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
			<article className="page">
				<h1>{page.title.rendered}</h1>
				<div
					dangerouslySetInnerHTML={{ __html: page.content.rendered }}
				/>
			</article>
		</>
	)
}
