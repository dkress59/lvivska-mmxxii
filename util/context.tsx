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
}

export const CartContext = React.createContext<CartContextDefinition>({
	cartItems: [],
	setCartItems: () => null,
})

export function CartContextProvider({ children }: PropsWithChildren) {
	const [cartItems, setCartItems] = useState<CartItem[]>(
		//getCartFromLocalStorage()
		[],
	)

	return (
		<CartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</CartContext.Provider>
	)
}
