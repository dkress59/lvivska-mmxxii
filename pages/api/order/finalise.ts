import { NextApiRequest, NextApiResponse } from 'next'
import { Stripe } from 'stripe'

import { CmsClient } from '../../../util/cms-client'
import { STRIPE_SECRET_KEY } from '../../../util/constants'
import { getAllProducts } from '../../../util/util'

const stripe = new Stripe(STRIPE_SECRET_KEY, {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	apiVersion: '2022-08-01; orders_beta=v4',
})

const cmsClient = new CmsClient()

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { orderId } = <{ orderId: string }>req.body

	const { data: lineItems } = await stripe.orders.listLineItems(orderId)

	res.status(200).json(lineItems)

	// ToDo: avoid double-firing on page refresh

	const products = await getAllProducts()
	await Promise.all(
		lineItems.map(item => {
			const productId = products.find(
				product => product.acf.sku === item.product!,
			)!.id
			return cmsClient.reduceStock({
				productId,
				quantity: item.quantity!,
			})
		}),
	)
}
