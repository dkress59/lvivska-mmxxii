import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Order, PaymentIntent, StripeError } from '@stripe/stripe-js'
import React, { FormEvent, useState } from 'react'

import { NEXT_PUBLIC_URL } from '../util/constants'

export function CheckoutForm() {
	const stripe = useStripe()
	const elements = useElements()

	const [errorMessage, setErrorMessage] = useState<string | null>(null)

	const handleSubmitOrder = (event: FormEvent) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault()
		;(async () => {
			if (!stripe || !elements) {
				// Stripe.js has not yet loaded.
				// Make sure to disable form submission until Stripe.js has loaded.
				return
			}

			const result = (await stripe.processOrder({
				//`Elements` instance that was used to create the Payment Element
				elements,
				confirmParams: {
					return_url: `${NEXT_PUBLIC_URL}/payment-successful`,
				},
			})) as { error: StripeError } | { order: Order }

			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			if ('error' in result && !!result.error) {
				// This point will only be reached if there is an immediate error when
				// confirming the payment. Show error to your customer (e.g., payment
				// details incomplete)
				setErrorMessage(
					result.error.message ?? 'there was an error with stripe',
				)
			} else {
				if (
					(result as { order: Order }).order.payment.status ===
					('complete' as PaymentIntent.Status)
				) {
					// Show a success message to your customer
					// There's a risk of the customer closing the window before callback
					// execution. Set up a webhook or plugin to listen for the
					// payment_intent.succeeded event that handles any business critical
					// post-payment actions.
				}
			}
		})()
	}

	return (
		<form onSubmit={handleSubmitOrder}>
			<PaymentElement />
			<button disabled={!stripe}>Submit</button>
			{/* Show error message to your customers */}
			{errorMessage && <div>{errorMessage}</div>}
		</form>
	)
}
