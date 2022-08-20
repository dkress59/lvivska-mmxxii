import { useEffect } from 'react'

import { finaliseOrder } from '../util/util'

export default function PaymentSuccessful() {
	useEffect(() => {
		;(async () => {
			const currentUrl = new URL(window.location.href)
			const orderId = currentUrl.searchParams.get('order')
			if (!orderId) {
				console.error('orderId missing') // ToDo: improve error handling
			} else {
				await finaliseOrder(orderId)
			}
		})()
	}, [])

	return (
		<article id="payment-success">
			<h1>Ihre Bestellung war erfolgreich.</h1>
		</article>
	)
}
