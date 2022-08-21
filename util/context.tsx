import React, { PropsWithChildren, useEffect, useState } from 'react'

import { LOCAL_STORAGE } from './constants'
import { CartItem, StateSetter, WPSettings } from './types'
import { getAllSettings } from './util'

interface CartContextDefinition {
	cartItems: CartItem[]
	setCartItems: StateSetter<CartItem[]>
	clientSecret: string
	setClientSecret: StateSetter<string>
	settings: null | WPSettings
}

function getCartFromLocalStorage(): CartItem[] {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!global.window) return []
	const stored = localStorage.getItem(LOCAL_STORAGE.CART)
	if (!stored) return []
	return JSON.parse(stored) as CartItem[]
}

export const CartContext = React.createContext<CartContextDefinition>({
	cartItems: [],
	setCartItems: () => null,
	clientSecret: '',
	setClientSecret: () => null,
	settings: null,
})

export function CartContextProvider({ children }: PropsWithChildren) {
	const [initialRender, setInitialRender] = useState(true)
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [clientSecret, setClientSecret] = useState('')
	const [settings, setSettings] = useState<null | WPSettings>(null)

	useEffect(() => {
		setCartItems(getCartFromLocalStorage())
		setInitialRender(false)
		;(async () => {
			setSettings(await getAllSettings())
		})()
	}, [])

	useEffect(() => {
		if (!initialRender) {
			localStorage.setItem(LOCAL_STORAGE.CART, JSON.stringify(cartItems))
		}
	}, [cartItems, initialRender])

	return (
		<CartContext.Provider
			value={{
				cartItems,
				setCartItems,
				clientSecret,
				setClientSecret,
				settings,
			}}
		>
			{children}
		</CartContext.Provider>
	)
}
