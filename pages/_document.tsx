import Document, {
	DocumentContext,
	Head,
	Html,
	Main,
	NextScript,
} from 'next/document'

import { Favicons } from '../components/favicons'
import { ImagePreloader } from '../components/image-preloader'
import { CustomWPMedia } from '../util/types'
import { getAllImages } from '../util/util'

class NextDocument extends Document<{ media: CustomWPMedia[] }> {
	static async getInitialProps(ctx: DocumentContext) {
		const originalRenderPage = ctx.renderPage
		const media = await getAllImages()

		// Run the React rendering logic synchronously
		ctx.renderPage = () =>
			originalRenderPage({
				// Useful for wrapping the whole react tree
				enhanceApp: App => App,
				// Useful for wrapping in a per-page basis
				enhanceComponent: Component => Component,
			})

		// Run the parent `getInitialProps`, it now includes the custom `renderPage`
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps, media }
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://use.typekit.net/olp1ylu.css"
					/>
					<Favicons />
					<ImagePreloader media={this.props.media} />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default NextDocument
