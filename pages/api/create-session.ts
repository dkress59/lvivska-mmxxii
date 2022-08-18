import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { STRIPE_SECRET_KEY } from '../../util/constants'
import { CartItem } from '../../util/types'
import { getAllImages } from '../../util/util'

// This is your test secret API key.
const stripe = new Stripe(STRIPE_SECRET_KEY, {
	apiVersion: '2022-08-01',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { cartItems } = <{ cartItems: CartItem[] }>req.body
	const media = await getAllImages()

	const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
		cartItems.map(({ quantity, product }) => ({
			quantity,
			price_data: {
				currency: 'eur',
				product_data: {
					name: product.title.rendered,
					description: product.acf.subtitle,
					images: [
						media.find(
							image => image.id === product.featured_media,
						)!.source_url,
					],
					tax_code: 'txcd_99999999',
				},
				unit_amount: product.acf.price * 100,
				tax_behavior: 'inclusive',
			},
		}))
	console.debug({ lineItems })

	return stripe.checkout.sessions.create({
		success_url: 'https://example.com/success',
		cancel_url: 'https://example.com/cancel',
		line_items: lineItems,
		mode: 'payment',
	})
}
