import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { FormEvent, useEffect, useState } from 'react'

export function CheckoutForm() {
	const stripe = useStripe()
	const elements = useElements()

	const [message, setMessage] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (!stripe) {
			return
		}

		const clientSecret = new URLSearchParams(window.location.search).get(
			'payment_intent_client_secret',
		)

		if (!clientSecret) {
			return
		}

		;(async () => {
			const { paymentIntent } = await stripe.retrievePaymentIntent(
				clientSecret,
			)
			switch (paymentIntent?.status) {
				case 'succeeded':
					setMessage('Payment succeeded!')
					break
				case 'processing':
					setMessage('Your payment is processing.')
					break
				case 'requires_payment_method':
					setMessage(
						'Your payment was not successful, please try again.',
					)
					break
				default:
					setMessage('Something went wrong.')
					break
			}
		})()
	}, [stripe])

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault()

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return
		}

		setIsLoading(true)
		;(async () => {
			const { error } = await stripe.confirmPayment({
				elements,
				confirmParams: {
					// Make sure to change this to your payment completion page
					return_url: 'http://localhost:3000',
				},
			})

			// This point will only be reached if there is an immediate error when
			// confirming the payment. Otherwise, your customer will be redirected to
			// your `return_url`. For some payment methods like iDEAL, your customer will
			// be redirected to an intermediate site first to authorize the payment, then
			// redirected to the `return_url`.
			if (
				error.type === 'card_error' ||
				error.type === 'validation_error'
			) {
				setMessage(error.message ?? 'undefined stripe error.')
			} else {
				setMessage('An unexpected error occurred.')
			}

			setIsLoading(false)
		})()
	}

	return (
		<form id="payment-form" onSubmit={handleSubmit}>
			<PaymentElement id="payment-element" />
			<button disabled={isLoading || !stripe || !elements} id="submit">
				<span id="button-text">
					{isLoading ? (
						<div className="spinner" id="spinner"></div>
					) : (
						'Pay now'
					)}
				</span>
			</button>
			{/* Show any error or success messages */}
			{message && <div id="payment-message">{message}</div>}
		</form>
	)
}
