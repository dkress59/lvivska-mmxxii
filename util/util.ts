import { CmsClient } from './cms-client'
import { CartItem, CustomWPMedia } from './types'

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
