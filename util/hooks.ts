import { useContext, useEffect } from 'react'

import { LOCAL_STORAGE } from './constants'
import { CartContext } from './context'
import { WPProduct } from './types'

export function useCart(products: WPProduct[]) {
	const { cartItems, setCartItems } = useContext(CartContext)

	function addToCart(sku: string, quantity: number) {
		const alreadyInCart =
			cartItems.find(({ product }) => product.acf.sku === sku)
				?.quantity ?? 0
		const newQuantity = alreadyInCart + quantity

		const newCart = [
			...cartItems.filter(({ product }) => product.acf.sku !== sku),
			{
				product: products.find(({ acf }) => acf.sku === sku)!,
				quantity: newQuantity,
			},
		]

		setCartItems(newCart)
	}

	function removeFromCart(sku: string, quantity: number) {
		const alreadyInCart =
			cartItems.find(({ product }) => product.acf.sku === sku)
				?.quantity ?? 0
		const newQuantity =
			alreadyInCart - quantity >= 0 ? alreadyInCart - quantity : 0

		const entirelyRemoved = cartItems.filter(
			({ product }) => product.acf.sku !== sku,
		)

		const newCart = !newQuantity
			? entirelyRemoved
			: [
					...entirelyRemoved,
					{
						product: products.find(({ acf }) => acf.sku === sku)!,
						quantity: newQuantity,
					},
			  ]

		setCartItems(newCart)
	}

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE.CART, JSON.stringify(cartItems))
	}, [cartItems])

	return { cartItems, addToCart, removeFromCart }
}
