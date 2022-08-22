import Link from 'next/link'
import { useRouter } from 'next/router'
import {
	MutableRefObject,
	useContext,
	useEffect,
	useRef,
	useState,
} from 'react'

import { CartContext } from '../util/context'
import { StateSetter } from '../util/types'
import { getActiveClassName } from '../util/util'
import { CartButton } from './cart-button'

function getMainHeight(headerRef: MutableRefObject<null | HTMLDivElement>) {
	const { innerHeight } = window
	const mainStart =
		headerRef.current!.offsetTop + headerRef.current!.clientHeight + 32
	const mainEnd = innerHeight - 32

	return mainEnd - mainStart
}

export function Navigation({
	setInitialMainHeight,
}: {
	setInitialMainHeight: StateSetter<number>
}) {
	const [isActive, setIsActive] = useState(false)
	const headerRef = useRef<null | HTMLDivElement>(null)
	const { cartItems, settings } = useContext(CartContext)
	const { asPath } = useRouter()

	const closeMenu = () => setIsActive(false)

	useEffect(() => {
		setInitialMainHeight(getMainHeight(headerRef))
	}, [setInitialMainHeight])

	useEffect(() => {
		const mainElement = document.querySelector('main')

		function onScroll() {
			if (isActive) closeMenu()
		}

		mainElement?.addEventListener('click', closeMenu)
		document.addEventListener('scroll', onScroll)

		return () => {
			mainElement?.removeEventListener('click', closeMenu)
			document.removeEventListener('scroll', onScroll)
		}
	})

	return (
		<>
			<header ref={headerRef} className={isActive ? 'active' : undefined}>
				<nav className="nav">
					<Link href="/explore">
						<a
							className={getActiveClassName({
								asPath,
								route: 'explore',
							})}
							onClick={closeMenu}
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
							onClick={closeMenu}
							title="Spirit"
						>
							<span>Spirit</span>
						</a>
					</Link>
				</nav>
				<Link href="/">
					<a className="logo" onClick={closeMenu}>
						LVIVSKA
					</a>
				</Link>
				<nav className="nav">
					<Link href="/quality">
						<a
							className={getActiveClassName({
								asPath,
								route: 'quality',
							})}
							onClick={closeMenu}
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
							onClick={closeMenu}
							title="Products"
						>
							<span>Products</span>
						</a>
					</Link>
					{!!settings && !!cartItems.length && (
						<CartButton {...{ cartItems, closeMenu, settings }} />
					)}
				</nav>
			</header>
			<button
				id="mobile-menu-button"
				onClick={() => setIsActive(!isActive)}
			>
				Menu
			</button>
			<Link href="/">
				<a className="mobile logo" onClick={closeMenu}>
					LVIVSKA
				</a>
			</Link>
		</>
	)
}
