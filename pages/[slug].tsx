import Image from 'next/image'
import { WPPage } from 'wordpress-api-client'

import { CmsClient } from '../util/cms-client'
import { CustomWPMedia } from '../util/types'

const cmsClient = new CmsClient()

async function getAllPages() {
	return await cmsClient.page().dangerouslyFindAll()
}

async function getAllImages() {
	return (await cmsClient.media<CustomWPMedia>().find()).filter(
		Boolean,
	) as CustomWPMedia[]
}

export async function getStaticPaths() {
	const wpPages = await getAllPages()
	const paths = wpPages.map(({ slug }) => ({
		params: {
			slug,
		},
	}))

	return {
		paths,
		fallback: false, // can also be true or 'blocking'
	}
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const [pages, media] = await Promise.all([getAllPages(), getAllImages()])
	const page = pages.find(page => page.slug === params.slug)

	return {
		props: {
			page,
			media,
		},
	}
}

const WpPage = ({ media, page }: { media: CustomWPMedia[]; page: WPPage }) => {
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
				<div
					dangerouslySetInnerHTML={{ __html: page.content.rendered }}
				/>
			</article>
		</>
	)
}

export default WpPage
