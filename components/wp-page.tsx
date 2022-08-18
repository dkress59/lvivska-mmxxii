import { PageProps } from '../util/types'
import { getImgSrcSet } from '../util/util'

export function WpPage({ media, page }: PageProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === page.featured_media,
	)

	return (
		<>
			{!!featuredMedia && (
				<figure className="page">
					<img
						alt={featuredMedia.alt_text}
						src={featuredMedia.source_url}
						srcSet={getImgSrcSet(featuredMedia)}
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
