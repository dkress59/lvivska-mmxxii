import WpApiClient, { DefaultEndpointWithRevision } from 'wordpress-api-client'

import { CMS_URL } from './constants'
import { StoredOrder, WPProduct, WPSettings } from './types'

export class CmsClient extends WpApiClient {
	constructor() {
		if (!CMS_URL) throw new Error('CMS_URL is undefined.')
		super(CMS_URL)
	}

	public product(): DefaultEndpointWithRevision<WPProduct> {
		return this.addPostType<WPProduct>('wp/v2/products', true)
	}

	public async settings(): Promise<WPSettings> {
		const response = await fetch(`${CMS_URL}/wp-json/lvivska/v1/settings`)
		return <Promise<WPSettings>>response.json()
	}

	public reduceStock(body: { productId: number; quantity: number }) {
		const method = this.createEndpointCustomPost<
			{
				productId: number
				quantity: number
			},
			{ productId: number; stock: number }
		>('lvivska/v1/stock')
		return method(body)
	}

	public storeOrder = this.createEndpointCustomPost<
		{ order: StoredOrder; env: 'development' | 'production' },
		{ message: { success: boolean }; data: unknown }
	>('lvivska/v1/order')
}
