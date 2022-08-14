import Link from 'next/link'
import { MouseEventHandler, useEffect, useState } from 'react'

import { CartItem } from '../util/types'
import { cartItemsToTotal } from '../util/util'
import { CartIcon } from './icons'

export function CartButton({
	cartItems,
	closeMenu,
}: {
	cartItems: CartItem[]
	closeMenu: MouseEventHandler
}) {
	const [className, setClassName] = useState('cart-total fade-in-bottom')

	useEffect(() => {
		const timeOut = setTimeout(
			() => setClassName('cart-total fade-out-top'),
			1 * 1000,
		)

		return () => clearTimeout(timeOut)
	})

	useEffect(() => {
		setClassName('cart-total fade-in-bottom')
	}, [cartItems])

	return (
		<Link href="/cart" passHref={true}>
			<a className="cart" onClick={closeMenu}>
				<CartIcon />
				<span className={className}>
					{cartItemsToTotal(cartItems)}€
				</span>
			</a>
		</Link>
	)
}
