import '../styles/globals.scss'

import moment from 'moment'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { AgeVerification } from '../components/age-verifictaion'
import { Navigation } from '../components/navigation'
import {
	LOCAL_STORAGE,
	localDateFormat,
	WEEK_IN_MILLISECONDS,
} from '../util/constants'
import { CartContextProvider } from '../util/context'
import { getActiveClassName } from '../util/util'

function ageVerifiedInLast4weeks(): boolean {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!global.window) return false
	if (!localStorage.getItem(LOCAL_STORAGE.AGE_VERIFIED)) return false
	return (
		moment(new Date()).diff(
			moment(
				localStorage.getItem(LOCAL_STORAGE.DATE_AGE_VERIFIED),
				localDateFormat,
			),
		) /
			WEEK_IN_MILLISECONDS <
		4
	)
}

function NextApp({ Component, pageProps }: AppProps) {
	const [initialRender, setInitialRender] = useState(true)
	const [initialMainHeight, setInitialMainHeight] = useState(0)
	const [ageVerified, setAgeVerified] = useState(ageVerifiedInLast4weeks())
	const { asPath } = useRouter()

	useEffect(() => {
		setInitialRender(false)
	}, [])

	return (
		<>
			<Head>
				<style
					type="text/css"
					dangerouslySetInnerHTML={{
						__html: `:root { --initial-main-height: ${initialMainHeight}px; }`,
					}}
				/>
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
				<AgeVerification
					active={!initialRender && !ageVerified}
					{...{ setAgeVerified }}
				/>
			</CartContextProvider>
		</>
	)
}

export default NextApp
