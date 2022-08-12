import '../styles/globals.scss'
import '../styles/index.scss'

import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { Favicons } from '../components/favicons'
import { Navigation } from '../components/navigation'
import { CartContextProvider } from '../util/context'
import { getActiveClassName } from '../util/util'

function NextApp({ Component, pageProps }: AppProps) {
	const [initialMainHeight, setInitialMainHeight] = useState(0)
	const { asPath } = useRouter()

	return (
		<>
			<Head>
				<style
					type="text/css"
					dangerouslySetInnerHTML={{
						__html: `:root { --initialMainHeight: ${initialMainHeight}px; }`,
					}}
				/>
				<Favicons />
			</Head>
			<CartContextProvider>
				<Navigation setInitialMainHeight={setInitialMainHeight} />
				<main>
					<Component {...pageProps} />
				</main>
				<footer>
					<Link
						href="legal"
						className={getActiveClassName({
							asPath,
							route: 'legal',
						})}
						passHref
					>
						Impressum &amp; Datenschutz
					</Link>
				</footer>
			</CartContextProvider>
		</>
	)
}

export default NextApp
