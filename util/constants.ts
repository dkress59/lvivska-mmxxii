export const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL ?? ''

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? ''
export const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL ?? ''
export const NEXT_PUBLIC_STRIPE_PUBLIC_KEY =
	process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? ''

export enum LOCAL_STORAGE {
	AGE_VERIFIED = 'age-verified',
	ALLOW_COOKIES = 'allow-cookies',
	CART = 'cart',
	DATE_AGE_VERIFIED = 'age-verified-date',
	DATE_ALLOW_COOKIES = 'allow-cookies-date',
}

export const localDateFormat = 'DD.MM.YYYY'

export const YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365
export const WEEK_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 7
