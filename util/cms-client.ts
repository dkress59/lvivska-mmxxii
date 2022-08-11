import WpApiClient, { DefaultEndpointWithRevision } from 'wordpress-api-client'

import { CMS_URL } from './constants'
import { WPProduct } from './types'

export class CmsClient extends WpApiClient {
	constructor() {
		super(CMS_URL)
	}

	public product(): DefaultEndpointWithRevision<WPProduct> {
		return this.addPostType<WPProduct>('wp/v2/products', true)
	}
}
