import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { useState } from 'react'
import { ThreeDots } from 'react-loading-icons'

import { CheckoutForm } from '../components/checkout-form'
import { NEXT_PUBLIC_STRIPE_PUBLIC_KEY } from '../util/constants'
import { useCart } from '../util/hooks'
import { AddressState, WPProduct } from '../util/types'
import { createOrder, getOrderSecret } from '../util/util'
import { AddressForm } from './address-form'

function reportValidity(
	element: null | HTMLInputElement | HTMLSelectElement,
	isValid: boolean,
): boolean {
	if (element && !element.validity.valid) {
		element.classList.add('invalid')
		element.reportValidity()
		return false
	}
	return isValid
}

function validateForms(billingIsShipping: boolean): boolean {
	let isValid = true

	const firstNameInputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="firstName"]',
	)
	const lastNameInputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="lastName"]',
	)
	const emailInputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="email"]',
	)
	const phoneInputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="phone"]',
	)
	const line1InputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="streetAndNumber"]',
	)
	const postalCodeInputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="postalCode"]',
	)
	const cityInputShipping = document.querySelector<HTMLInputElement>(
		'.shipping.address [name="city"]',
	)
	const stateInputShipping = document.querySelector<HTMLSelectElement>(
		'.shipping.address [name="state"]',
	)

	const firstNameInputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="firstName"]',
	)
	const lastNameInputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="lastName"]',
	)
	const emailInputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="email"]',
	)
	const phoneInputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="phone"]',
	)
	const line1InputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="streetAndNumber"]',
	)
	const postalCodeInputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="postalCode"]',
	)
	const cityInputBilling = document.querySelector<HTMLInputElement>(
		'.billing.address [name="city"]',
	)
	const stateInputBilling = document.querySelector<HTMLSelectElement>(
		'.billing.address [name="state"]',
	)

	isValid = reportValidity(firstNameInputShipping, isValid)
	isValid = reportValidity(lastNameInputShipping, isValid)
	isValid = reportValidity(emailInputShipping, isValid)
	isValid = reportValidity(phoneInputShipping, isValid)
	isValid = reportValidity(line1InputShipping, isValid)
	isValid = reportValidity(postalCodeInputShipping, isValid)
	isValid = reportValidity(cityInputShipping, isValid)
	isValid = reportValidity(stateInputShipping, isValid)

	if (!billingIsShipping) {
		isValid = reportValidity(firstNameInputBilling, isValid)
		isValid = reportValidity(lastNameInputBilling, isValid)
		isValid = reportValidity(emailInputBilling, isValid)
		isValid = reportValidity(phoneInputBilling, isValid)
		isValid = reportValidity(line1InputBilling, isValid)
		isValid = reportValidity(postalCodeInputBilling, isValid)
		isValid = reportValidity(cityInputBilling, isValid)
		isValid = reportValidity(stateInputBilling, isValid)
	}

	return isValid
}

export function CheckoutPage({ products }: { products: WPProduct[] }) {
	const [isLoading, setIsLoading] = useState(false)
	const [isSending, setIsSending] = useState(false)
	const [billingIsShipping, setBillingIsShipping] = useState(true)
	const [shippingAddress, setShippingAddress] = useState<null | AddressState>(
		null,
	)
	const [billingAddress, setBillingAddress] = useState<null | AddressState>(
		null,
	)
	const { cartItems, clientSecret, setClientSecret } = useCart(products)
	const [stripePromise, setStripePromise] = useState<null | Stripe>(null)

	function onProceedToPayment() {
		if (validateForms(billingIsShipping)) {
			setIsLoading(true)
			;(async () => {
				try {
					if (!shippingAddress) {
						throw new Error('shipping address is incomplete')
					}
					setStripePromise(
						await loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
							betas: ['process_order_beta_1'],
							apiVersion: '2022-08-01; orders_beta=v4',
						}),
					)
					if (!clientSecret) {
						const order = await createOrder({
							cartItems,
							shippingAddress,
							billingAddress,
						})
						const secret = await getOrderSecret(order.id)
						if (!secret.clientSecret) {
							throw new Error('Could not get clientSecret')
						}
						setClientSecret(secret.clientSecret)
					}
					// else: update order
				} catch (exception) {
					console.error(exception)
				} finally {
					setIsLoading(false)
				}
			})()
		}
	}

	return (
		<article id="checkout">
			<h1>Checkout</h1>
			<br />
			<div className="animation-wrapper">
				<AddressForm setAddressState={setShippingAddress} />
				<label
					htmlFor="billingIsShipping"
					onClick={() => setBillingIsShipping(!billingIsShipping)}
				>
					<input
						type="checkbox"
						name="billingIsShipping"
						checked={billingIsShipping}
					/>
					Rechnungsadresse entspricht Lieferadresse
				</label>
				{!billingIsShipping && (
					<AddressForm
						setAddressState={setBillingAddress}
						forBilling
					/>
				)}
				<button
					className="payment"
					onClick={onProceedToPayment}
					disabled={isLoading}
				>
					Bestellung abschließen{isLoading && <ThreeDots />}
				</button>
				{!!clientSecret && (
					<Elements
						options={{
							clientSecret,
							appearance: {
								theme: 'stripe',
							},
							locale: 'de',
						}}
						stripe={stripePromise}
					>
						<CheckoutForm {...{ setIsSending }} />
					</Elements>
				)}
				{isSending && (
					<aside id="sending">
						<ThreeDots fill="#000" />
					</aside>
				)}
			</div>
		</article>
	)
}
