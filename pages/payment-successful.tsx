import { useContext, useEffect } from 'react'

import { CartContext } from '../util/context'

export default function PaymentSuccessful() {
	const { setCartItems } = useContext(CartContext)

	useEffect(() => {
		setCartItems([])
	}, [setCartItems])

	return (
		<article id="payment-success">
			<h1>Ihre Bestellung war erfolgreich.</h1>
		</article>
	)
}
