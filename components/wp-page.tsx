import Head from 'next/head'

import { PageProps } from '../util/types'
import { getImgSrcSet } from '../util/util'

export function WpPage({
	media,
	page: { featured_media, title, content, yoast_head_json },
}: PageProps) {
	const featuredMedia = media.find(
		attachment => attachment.id === featured_media,
	)

	return (
		<>
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
				<figure className="page">
					<img
						alt={featuredMedia.alt_text}
						src={featuredMedia.source_url}
						srcSet={getImgSrcSet(featuredMedia)}
					/>
				</figure>
			)}
			<article className="page">
				<h1>{title.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: content.rendered }} />
			</article>
		</>
	)
}
