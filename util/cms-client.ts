import WpApiClient, { DefaultEndpointWithRevision } from 'wordpress-api-client'

import { WPProduct } from './types'

export class CmsClient extends WpApiClient {
	public product(): DefaultEndpointWithRevision<WPProduct> {
		return this.addPostType<WPProduct>('wp/v2/products', true)
	}
}
