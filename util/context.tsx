import React, { PropsWithChildren, useEffect, useState } from 'react'

import { LOCAL_STORAGE } from './constants'
import { CartItem, StateSetter } from './types'

interface CartContextDefinition {
	cartItems: CartItem[]
	setCartItems: StateSetter<CartItem[]>
	clientSecret: string
	setClientSecret: StateSetter<string>
}

function getCartFromLocalStorage(): CartItem[] {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!global.window) return []
	return (
		(JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART) ?? '') as
			| undefined
			| CartItem[]) ?? []
	)
}

export const CartContext = React.createContext<CartContextDefinition>({
	cartItems: [],
	setCartItems: () => null,
	clientSecret: '',
	setClientSecret: () => null,
})

export function CartContextProvider({ children }: PropsWithChildren) {
	const [initialRender, setInitialRender] = useState(true)
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [clientSecret, setClientSecret] = useState('')

	useEffect(() => {
		setCartItems(getCartFromLocalStorage())
		setInitialRender(false)
	}, [])

	useEffect(() => {
		if (!initialRender) {
			localStorage.setItem(LOCAL_STORAGE.CART, JSON.stringify(cartItems))
		} else {
			console.debug('initial useCart render')
		}
	}, [cartItems, initialRender])

	return (
		<CartContext.Provider
			value={{ cartItems, setCartItems, clientSecret, setClientSecret }}
		>
			{children}
		</CartContext.Provider>
	)
}
