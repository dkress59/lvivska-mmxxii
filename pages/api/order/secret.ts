import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { STRIPE_SECRET_KEY } from '../../../util/constants'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	apiVersion: '2022-08-01; orders_beta=v4',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { orderId } = <{ orderId: string }>req.body

	const order = await stripe.orders.retrieve(orderId)
	res.json({ clientSecret: order.client_secret })
}
