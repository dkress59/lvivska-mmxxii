import Link from 'next/link'
import { useRouter } from 'next/router'
import { MutableRefObject, useEffect, useRef } from 'react'

import { StateSetter } from '../util/types'
import { getActiveClassName } from '../util/util'

function getMainHeight(headerRef: MutableRefObject<null | HTMLDivElement>) {
	const { innerHeight } = window
	const mainStart =
		headerRef.current!.offsetTop + headerRef.current!.clientHeight + 32
	const mainEnd = innerHeight - 32

	//console.debug({ innerHeight, mainStart, mainEnd, initialMainHeight })
	return mainEnd - mainStart
}

export function Navigation({
	setInitialMainHeight,
}: {
	setInitialMainHeight: StateSetter<number>
}) {
	const { asPath } = useRouter()

	const headerRef = useRef<null | HTMLDivElement>(null)

	useEffect(() => {
		setInitialMainHeight(getMainHeight(headerRef))
	}, [setInitialMainHeight])

	return (
		<header ref={headerRef}>
			<nav className="nav">
				<Link href="/explore">
					<a
						className={getActiveClassName({
							asPath,
							route: 'explore',
						})}
						title="Explore"
					>
						<span>Explore</span>
					</a>
				</Link>
				<Link href="/spirit">
					<a
						className={getActiveClassName({
							asPath,
							route: 'spirit',
						})}
						title="Spirit"
					>
						<span>Spirit</span>
					</a>
				</Link>
			</nav>
			<Link href="/">
				<a className="logo">LVIVSKA</a>
			</Link>
			<nav className="nav">
				<Link href="/quality">
					<a
						className={getActiveClassName({
							asPath,
							route: 'quality',
						})}
						title="Quality"
					>
						<span>Quality</span>
					</a>
				</Link>
				<Link href="/products">
					<a
						className={getActiveClassName({
							asPath,
							route: 'products',
						})}
						title="Products"
					>
						<span>Products</span>
					</a>
				</Link>
			</nav>
		</header>
	)
}
