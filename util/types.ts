import { WPPage } from 'wordpress-api-client'

export type WPProduct = WPPage<{
	subtitle: string
	sku: string
	price: number
	capacity: number
	stock: number
	weight: number
	dimensions: {
		width: number
		height: number
		depth: number
	}
}>
