import React, { PropsWithChildren, useState } from 'react'

import { CartItem, StateSetter } from './types'

// FixMe
/* function getCartFromLocalStorage(): CartItem[] {
	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (!global.window) return []
	return (
		(JSON.parse(localStorage.getItem(LOCAL_STORAGE.CART) ?? '') as
			| undefined
			| CartItem[]) ?? []
	)
} */

interface CartContextDefinition {
	cartItems: CartItem[]
	setCartItems: StateSetter<CartItem[]>
	clientSecret: string
	setClientSecret: StateSetter<string>
}

export const CartContext = React.createContext<CartContextDefinition>({
	cartItems: [],
	setCartItems: () => null,
	clientSecret: '',
	setClientSecret: () => null,
})

export function CartContextProvider({ children }: PropsWithChildren) {
	const [cartItems, setCartItems] = useState<CartItem[]>(
		//getCartFromLocalStorage()
		[],
	)
	const [clientSecret, setClientSecret] = useState('')

	return (
		<CartContext.Provider
			value={{ cartItems, setCartItems, clientSecret, setClientSecret }}
		>
			{children}
		</CartContext.Provider>
	)
}
