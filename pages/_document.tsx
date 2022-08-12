import Document, { Head, Html, Main, NextScript } from 'next/document'

import { Favicons } from '../components/favicons'

class NextDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="stylesheet"
						href="https://use.typekit.net/olp1ylu.css"
					/>
					<Favicons />
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
