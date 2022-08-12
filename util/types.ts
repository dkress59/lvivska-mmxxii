import { Dispatch, SetStateAction } from 'react'
import { WPMedia, WPPage } from 'wordpress-api-client'

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

export interface CustomWPMedia extends WPMedia {
	media_details: {
		width: number
		height: number
		file: string
		filesize: number
		sizes: {
			'medium': {
				file: string
				width: number
				height: number
				filesize: number
				mime_type: string
				source_url: string
			}
			'large': {
				file: string
				width: number
				height: number
				filesize: number
				mime_type: string
				source_url: string
			}
			'thumbnail': {
				file: string
				width: number
				height: number
				filesize: number
				mime_type: string
				source_url: string
			}
			'medium_large': {
				file: string
				width: number
				height: number
				filesize: number
				mime_type: string
				source_url: string
			}
			'1536x1536': {
				file: string
				width: number
				height: number
				filesize: number
				mime_type: string
				source_url: string
			}
			'2048x2048': {
				file: string
				width: number
				height: number
				filesize: number
				mime_type: string
				source_url: string
			}
			'full': {
				file: string
				width: number
				height: number
				mime_type: string
				source_url: string
			}
		}
	}
}

export type StateSetter<T> = Dispatch<SetStateAction<T>>

export interface PageProps {
	media: CustomWPMedia[]
	page: WPPage
	products: WPProduct[]
}

export interface ProductProps {
	media: CustomWPMedia[]
	product: WPProduct
}
