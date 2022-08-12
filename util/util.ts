import { CmsClient } from './cms-client'
import { CustomWPMedia } from './types'

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
	if (asPath.startsWith('/' + route + '/')) return 'active'
	return undefined
}
