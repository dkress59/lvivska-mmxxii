import { CustomWPMedia } from '../util/types'
import { getImgSrcSet } from '../util/util'

export function ImagePreloader({ media }: { media: CustomWPMedia[] }) {
	return (
		<>
			{media.map(image => (
				<link
					key={image.id}
					rel="preload"
					as="image"
					imageSrcSet={getImgSrcSet(image)}
					//imageSizes="50vw, 100vw"
				/>
			))}
		</>
	)
}
