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
	const { order } = <{ order: Stripe.Order }>req.body

	const resource = Stripe.StripeResource.extend({
		request: Stripe.StripeResource.method({
			method: 'POST',
			path: `orders/${order.id}/submit`,
		}),
	})

	await new Promise((resolve, reject) => {
		new resource(stripe).request(
			{
				expected_total: order.amount_total,
			},
			(error: unknown, response: unknown) => {
				if (error) {
					console.error({ error, response })
					res.status(500).json(error)
					reject(error)
				}
				console.debug({ error, response })
				res.status(200).json(response)
				resolve(response)
			},
		)
	})
}
