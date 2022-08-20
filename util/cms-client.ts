import WpApiClient, {
	DefaultEndpointWithRevision,
	EndpointFindOnly,
} from 'wordpress-api-client'

import { CMS_URL } from './constants'
import { WPProduct, WPSettings } from './types'

export class CmsClient extends WpApiClient {
	constructor() {
		super(CMS_URL)
	}

	public product(): DefaultEndpointWithRevision<WPProduct> {
		return this.addPostType<WPProduct>('wp/v2/products', true)
	}

	public settings(): EndpointFindOnly<WPSettings> {
		return this.createEndpointCustomGet<WPSettings>(
			'lvivska/v1/settings',
		) as EndpointFindOnly<WPSettings>
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
}
