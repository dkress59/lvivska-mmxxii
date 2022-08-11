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
