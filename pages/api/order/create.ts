import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { STRIPE_SECRET_KEY } from '../../../util/constants'
import { CartItem } from '../../../util/types'
import { getAllImages } from '../../../util/util'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	apiVersion: '2022-08-01; orders_beta=v4',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { cartItems } = <{ cartItems: CartItem[] }>req.body
	const media = await getAllImages()

	const lineItems: Stripe.OrderCreateParams.LineItem[] = cartItems.map(
		({ quantity, product }) => ({
			quantity,
			product_data: {
				name: product.title.rendered,
				description: product.acf.subtitle,
				images: [
					media.find(image => image.id === product.featured_media)!
						.source_url,
				],
				tax_code: 'txcd_99999999',
				id: product.acf.sku,
				package_dimensions: {
					width: product.acf.dimensions.width,
					height: product.acf.dimensions.height,
					length: product.acf.dimensions.depth,
					weight: product.acf.weight,
				},
				shippable: true,
			},
			price_data: {
				currency: 'eur',
				unit_amount: product.acf.price * 100,
				tax_behavior: 'inclusive',
			},
		}),
	)
	console.debug({ lineItems })

	try {
		const order = await stripe.orders.create({
			currency: 'eur',
			line_items: lineItems,
			expand: ['line_items'],
			//automatic_tax:
			billing_details: {
				address: {
					city: 'Leipzig',
					country: 'DE',
					line1: 'Eisenbahnstraße 131',
					postal_code: '04315',
					state: 'NW',
				},
				email: 'mail@damiankress.de',
				name: 'Damian Kress',
				phone: '+4915771724215',
			},
			shipping_details: {
				address: {
					city: 'Leipzig',
					country: 'DE',
					line1: 'Eisenbahnstraße 131',
					postal_code: '04315',
					state: 'NW',
				},
				name: 'Damian Kress',
				phone: '+4915771724215',
			},
			shipping_cost: {
				shipping_rate_data: {
					display_name: 'Versandkosten',
					delivery_estimate: {
						minimum: {
							unit: 'business_day',
							value: 5,
						},
						maximum: {
							unit: 'business_day',
							value: 7,
						},
					},
					fixed_amount: {
						amount: 450,
						currency: 'eur',
					},
					type: 'fixed_amount',
				},
			},
			/* payment: {
			settings: {
				return_url: ,
			},
		}, */
		})

		res.status(201).json(order)
	} catch (error) {
		res.status(500).json(error)
	}
}
