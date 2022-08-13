import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { STRIPE_SECRET_KEY } from '../../util/constants'
import { CartItem } from '../../util/types'
import { cartItemsToTotal } from '../../util/util'

// This is your test secret API key.
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { cartItems } = <{ cartItems: CartItem[] }>req.body

	// Create a PaymentIntent with the order amount and currency
	const paymentIntent = await stripe.paymentIntents.create({
		amount: Number(cartItemsToTotal(cartItems)) * 100, // in cents
		currency: 'eur',
		automatic_payment_methods: {
			enabled: true,
		},
		receipt_email: 'stripe-test@damiankress.de',
	})

	res.send({
		clientSecret: paymentIntent.client_secret,
	})
}
