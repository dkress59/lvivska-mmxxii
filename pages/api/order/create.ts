import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { STRIPE_SECRET_KEY } from '../../../util/constants'
import { OrderCreateBody } from '../../../util/types'
import { getAllImages, getShippingRate } from '../../../util/util'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	apiVersion: '2022-08-01; orders_beta=v4',
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { cartItems, shippingAddress, billingAddress, settings } = <
		OrderCreateBody
	>req.body
	const finalBillingAddress = billingAddress ?? shippingAddress

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

	try {
		const order = await stripe.orders.create({
			currency: 'eur',
			line_items: lineItems,
			expand: ['line_items'],
			automatic_tax: {
				enabled: true,
			},
			billing_details: {
				address: {
					city: finalBillingAddress.city,
					country: 'DE',
					line1: finalBillingAddress.line1,
					postal_code: finalBillingAddress.postalCode,
					state: finalBillingAddress.state,
				},
				email: finalBillingAddress.email,
				name: `${finalBillingAddress.firstName} ${finalBillingAddress.lastName}`,
				phone: finalBillingAddress.phone,
			},
			shipping_details: {
				address: {
					city: shippingAddress.city,
					country: 'DE',
					line1: shippingAddress.line1,
					postal_code: shippingAddress.postalCode,
					state: shippingAddress.state,
				},
				name: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
				phone: shippingAddress.phone,
			},
			shipping_cost: {
				shipping_rate_data: {
					display_name: 'Versandkosten',
					delivery_estimate: {
						minimum: {
							unit: 'business_day',
							value: 5, // ToDo: Lieferzeit
						},
						maximum: {
							unit: 'business_day',
							value: 7, // ToDo: Lieferzeit
						},
					},
					fixed_amount: {
						amount: getShippingRate(cartItems, settings),
						currency: 'eur',
					},
					type: 'fixed_amount',
					tax_behavior: 'inclusive',
				},
			},
		})

		res.status(201).json(order)
	} catch (error) {
		res.status(500).json(error)
	}
}
