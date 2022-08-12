export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? ''

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? ''
export const NEXT_PUBLIC_STRIPE_PUBLIC_KEY =
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ''

export enum LOCAL_STORAGE {
	CART = 'cart',
}
