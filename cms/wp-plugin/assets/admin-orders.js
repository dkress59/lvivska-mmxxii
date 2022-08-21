async function retrieveOrders(nonce) {
	const response = await fetch('/wp-json/lvivska/v1/order', {
		headers: {
			'X-WP-Nonce': nonce,
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
	})
	return response.json()
}

window.addEventListener('load', async () => {
	const wrapper = document.body.querySelector('form#post')

	document.body.querySelector('.acf-admin-notice').remove()
	wrapper.querySelector('#poststuff').remove()

	const nonce = window.auth.nonce
	const {
		data: { orders },
	} = await retrieveOrders(nonce)
	const table = document.createElement('article')

	orders.forEach(order => {
		const orderElement = document.createElement('section')
		orderElement.innerText = order.shop_order

		table.appendChild(orderElement)
	})

	wrapper.appendChild(table)
})
