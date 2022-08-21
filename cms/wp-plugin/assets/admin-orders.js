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
		data: { orders: rows },
	} = await retrieveOrders(nonce)
	const ordersSet = new Set()
	rows.forEach(({ shop_order }) => ordersSet.add(shop_order))
	const orders = []
	ordersSet.forEach(order => orders.push(JSON.parse(order)))

	const table = document.createElement('article')

	orders.forEach(order => {
		console.debug({ order })
		const orderElement = document.createElement('section')
		orderElement.classList.add('order')

		const {
			lineItems,
			id,
			shipping_details,
			amount_total,
			billing_details,
		} = order

		const heading = document.createElement('h2')
		heading.innerText = shipping_details.name
		const idElement = document.createElement('small')
		idElement.innerText = id
		heading.appendChild(idElement)

		const customerDetails = document.createElement('h3')
		const phone = shipping_details.phone.startsWith('0')
			? shipping_details.phone
			: '0' + shipping_details.phone
		customerDetails.innerHTML = `
			<a href="mailto:${billing_details.email}">
			${billing_details.email}
			</a>
			&nbsp;
			<a href="tel:${phone}">
				${phone}
			</a>
		`

		const shippingElement = document.createElement('h3')
		shippingElement.classList.add('shipping')
		shippingElement.innerText =
			shipping_details.address.line1 +
			', ' +
			shipping_details.address.postal_code +
			' ' +
			shipping_details.address.city +
			', ' +
			shipping_details.address.state

		const itemsElement = document.createElement('div')
		lineItems.forEach(item => {
			console.debug({ item })
			itemElement = document.createElement('div')
			itemElement.classList.add('item')

			itemNameElement = document.createElement('p')
			itemNameElement.innerHTML =
				item.product + '<br />' + item.description
			itemElement.appendChild(itemNameElement)
			itemQuantityElement = document.createElement('p')
			itemQuantityElement.innerText = 'Anzahl: ' + String(item.quantity)
			itemElement.appendChild(itemQuantityElement)

			itemsElement.appendChild(itemElement)
		})

		const amountElement = document.createElement('aside')
		amountElement.innerText = (amount_total / 100).toFixed(2) + ' €'

		orderElement.appendChild(heading)
		orderElement.appendChild(customerDetails)
		orderElement.appendChild(shippingElement)
		orderElement.appendChild(itemsElement)
		orderElement.appendChild(amountElement)

		table.appendChild(orderElement)
	})

	wrapper.appendChild(table)
})
