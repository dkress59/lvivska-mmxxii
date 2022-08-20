import Stripe from 'stripe'

import { CmsClient } from './cms-client'
import { CartItem, CustomWPMedia, OrderCreateBody } from './types'

const cmsClient = new CmsClient()

export async function getAllPages() {
	return await cmsClient.page().dangerouslyFindAll()
}

export async function getAllProducts() {
	return await cmsClient.product().dangerouslyFindAll()
}

export async function getAllImages() {
	return (await cmsClient.media<CustomWPMedia>().find()).filter(
		Boolean,
	) as CustomWPMedia[]
}

export function getActiveClassName({
	asPath,
	route,
}: {
	asPath: string
	route: string
}) {
	if (asPath === '/' && route === 'explore') return 'active'
	if (asPath.startsWith('/' + route + '/')) return 'active'
	return undefined
}

/** rounded UP */
function taxFromTotal(total: number, taxPercent: number) {
	const tax = (total / (100 + taxPercent)) * taxPercent
	const times100 = Math.ceil(tax * 100)
	return times100 / 100
}

/** rounded DOWN */
function nettoFromTotal(total: number, taxPercent: number) {
	const tax = (total / (100 + taxPercent)) * 100
	const times100 = Math.floor(tax * 100)
	return times100 / 100
}

export const cartItemsToTotal = (cartItems: CartItem[]) =>
	cartItems
		.reduce(
			(previous: number, current: CartItem) =>
				previous + current.quantity * current.product.acf.price,
			0,
		)
		.toFixed(2)

export const cartItemsToTax = (cartItems: CartItem[], tax: number) =>
	cartItems.reduce(
		(previous: number, current: CartItem) =>
			previous +
			current.quantity * taxFromTotal(current.product.acf.price, tax),
		0,
	)

export const cartItemsToNetto = (cartItems: CartItem[], tax: number) =>
	cartItems.reduce(
		(previous: number, current: CartItem) =>
			previous +
			current.quantity * nettoFromTotal(current.product.acf.price, tax),
		0,
	)

const jsonHeader = { 'Content-Type': 'application/json' }

export async function createPaymentIntent(cartItems: CartItem[]) {
	const response = await fetch('/api/create-payment-intent', {
		method: 'POST',
		headers: jsonHeader,
		body: JSON.stringify({ cartItems }),
	})

	const data = <{ clientSecret: string }>await response.json()
	return data.clientSecret
}

export function getImgSrcSet(image: CustomWPMedia): string {
	const srcSet = Object.values(image.media_details.sizes).map(
		size => `${size.source_url} ${size.width}w`,
	)
	return srcSet.join(', ')
}

export async function createOrder({
	cartItems,
	shippingAddress,
	billingAddress,
}: OrderCreateBody): Promise<Stripe.Response<Stripe.Order>> {
	const response = await fetch('/api/order/create', {
		method: 'POST',
		headers: jsonHeader,
		body: JSON.stringify({ cartItems, shippingAddress, billingAddress }),
	})

	return <Stripe.Response<Stripe.Order>>await response.json()
}

export async function getOrderSecret(
	orderId: string,
): Promise<{ clientSecret: string | null }> {
	const response = await fetch('/api/order/secret', {
		method: 'POST',
		headers: jsonHeader,
		body: JSON.stringify({ orderId }),
	})

	return <{ clientSecret: string | null }>await response.json()
}

export async function submitOrder(order: Stripe.Order): Promise<unknown> {
	const response = await fetch('/api/order/submit', {
		method: 'POST',
		headers: jsonHeader,
		body: JSON.stringify({ order }),
	})

	return <unknown>await response.json()
}
